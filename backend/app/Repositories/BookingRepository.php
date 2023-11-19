<?php

namespace App\Repositories;

use App\Http\Resources\BillingResource;
use App\Http\Resources\RoomResource;
use App\Models\Billing;
use App\Models\BookDetail;
use App\Models\Booking;
use App\Models\HistoryHandleBooking;
use App\Models\Room;
use App\Models\RoomType;
use App\Models\Services;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Log;

class BookingRepository
{
    private Booking $booking;
    private BookDetail $booking_detail;
    private Room $room;
    private RoomType $room_type;
    private Billing $billing;
    private HistoryHandleBooking $history_handle;
    public function __construct()
    {
        $this->booking = new Booking();
        $this->booking_detail = new BookDetail();
        $this->room = new Room();
        $this->room_type = new RoomType();
        $this->billing = new Billing();
        $this->history_handle = new HistoryHandleBooking();
    }

    public function cancel($id)
    {
        $bookings = Booking::find($id);
        if (!$bookings) {
            return response()->json([
                'status' => 'error',
                'message' => 'Booking không tồn tại !',
                'data' => null
            ]);
        }
        $update = $bookings->update(['status' => true]);
        if ($update) {
            return response()->json([
                'status' => 'success',
                'message' => 'Cập nhật thành công !',
                'data' => $bookings
            ]);
        }
    }

    public function orderList(): AnonymousResourceCollection
    {
        return BillingResource::collection($this->billing->paginate(10));
    }

    public function orderDetail($id): BillingResource
    {
        return new BillingResource($this->billing->find($id));
    }

    private function check_room($check_in, $check_out, $branch_id, $adults, $children, $room_type_id, $amount_room): array
    {
        $config = config('status');
        //Check qua thoi gian ben Booking
        $room_booked = $this->booking
            // ->where('status', '=', config('status')[0]->id)
            ->where(function ($query) use ($config) {
                $query->where(function ($query) use ($config) {
                    $query->where('status', '=', $config[0]['id']);
                })
                    ->orWhere(function ($query) use ($config) {
                        $query->where('status', '=', $config[1]['id']);
                    })
                    ->orWhere(function ($query) use ($config) {
                        $query->where('status', '=', $config[3]['id']);
                    })
                    ->orWhere(function ($query) use ($config) {
                        $query->where('status', '=', $config[5]['id']);
                    })
                    ->orWhere(function ($query) use ($config) {
                        $query->where('status', '=', $config[8]['id']);
                    });
            })
            ->where(function ($query) use ($check_in, $check_out) {
                $query->where(function ($query) use ($check_in, $check_out) {
                    $query->where('checkin', '>=', $check_in)
                        ->where('checkout', '<=', $check_out);
                })
                    ->orWhere(function ($query) use ($check_in, $check_out) {
                        $query->where('checkin', '<=', $check_in)
                            ->where('checkout', '>=', $check_out);
                    })
                    ->orWhere(function ($query) use ($check_in, $check_out) {
                        $query->where('checkin', '>=', $check_in)->where('checkin', '<', $check_out)->where('checkout', '>=', $check_out);
                    })
                    ->orWhere(function ($query) use ($check_in, $check_out) {
                        $query->where('checkin', '<=', $check_in)->where('checkout', '>', $check_in)->where('checkout', '<=', $check_out);
                    });
            })->get();
        $room_id_booked = [];
        foreach ($room_booked as $item) {
            $book_detail = $this->booking_detail->where('booking_id', '=', $item->_id)->get();
            foreach ($book_detail as $key => $value) {
                $room_id_booked[] = $value->room_id;
            }
        }
        $room = Room::where('adults', '=', ceil($adults / $amount_room))
            ->where('children', '=', ceil($children / $amount_room))
            ->where('branch_id', '=', $branch_id)
            ->where('room_type_id', '=', $room_type_id)
            ->get();
        if (!$room) {
            return [];
        }
        $room_id_completed = [];
        foreach ($room as $item) {
            if (!in_array($item->_id, $room_id_booked)) {
                $room_id_completed[] = $item->_id;
            }
        }
        return $room_id_completed;
    }

    public function search($request): bool|array
    {
        $room_type = $request->room_type_id;
        $branch = $request->branch_id;
        $check_in = $request->check_in;
        $check_out = $request->check_out;
        $adults = $request->adults;
        $children = $request->children;
        $amount_room = $request->amount_room;
        $available_rooms = $this->check_room($check_in, $check_out, $branch, $adults, $children, $room_type, $amount_room);
        $room = [];
        if (count($available_rooms) < $amount_room) {
            return false;
        }
        foreach ($available_rooms as $key => $value) {
            $info_room = Room::find($value);
            $room[] = new RoomResource($info_room);
        }
        return $room;
    }

    public function book($request)
    {
        $soLuong = $request->soLuong;
        $room_id = $request->room_id;
        $branch_id = $request->branch_id;
        (int) $adults = $request->adults;
        (int) $children = $request->children;
        $param = $request->except(['soLuong', 'room_id', 'branch_id', 'adults', 'children']);
        $room = Room::where('_id', '=', $room_id)->where('branch_id', '=', $branch_id)->first();
        //Kiem tra phong con trong hay khong
        $room_valid = $this-> check_room($request->checkin, $request->checkout, $branch_id, $request->adults, $request->children, $room->room_type_id, $soLuong);

        // $room_valid = $this->check_room($request->checkin, $request->checkout, $request->adults, $request->children, $branch_id, $room->room_type_id, $soLuong);
        //Bat loi dat so luong phong
        if (!in_array($room_id,$room_valid)) {
            return response()->json([
                'message' => 'Phòng đã có người đặt !'
            ]);
        }
        $room_booking = [$room_id];
        if (count($room_valid) < $soLuong) {
            return response()->json([
                'message' => 'Không đủ phòng trống !'
            ]);
        }
        //phong co the dat
        foreach ($room_valid as $key => $value) {
            $room_booking[]= $value;
        }
        $room_booking = array_slice(array_unique($room_booking), 0, $soLuong);
        $total_discount = 0;
        $total_price_per_night = 0;
        foreach ($room_booking as $key => $value) {
            $total_discount += Room::find($value)->discount;
            $total_price_per_night += RoomType::where('_id', '=', Room::find($value)->room_type_id)->first()->price_per_night;
        }
        $param['room_type'] = $room->room_type_id;
        $param['booking_date'] = now()->toDateTimeString();
        $param['price_per_night'] = $total_price_per_night - $total_discount; // gia 1 dem cua booking
        $param['amount_people'] = [
            'total_people' => $adults + $children,
            'adults' => $adults,
            'children' => $children
        ];
        $param['representative'] = [
            'name' => $request->name,
            'email' => $request->email,
            'phone' => $request->phone
        ];
        $param['amount_room'] = $soLuong;
        $param['status'] = config('status')[0]['id'];
        //Lay ra id user neu ho da co tai khoan tu truoc
        $create = $this->booking->create($param);
        $details = [];
        foreach ($room_booking as $key => $value) {
            $details[] = [
                'booking_detail' => $this->booking_detail->create(
                    [
                        'booking_id' => $create->_id,
                        'room_id' => $value,
                        'room_name' => Room::find($value)->name
                    ]
                ),
                'info_room' => [
                    'name' => Room::find($value)->name,
                    'price' => RoomType::where('_id', '=', Room::find($value)->room_type_id)->first()->price_per_night - Room::find($value)->discount
                ]
            ];
        }
        //Hoa don
        $datediff = abs(strtotime($request->checkin) - strtotime($request->checkout));
        $amount_day = floor($datediff / (60 * 60 * 24)); // so ngay khach hang dat
        $billing_code = random_int(1, 10000);
        $total = $create->price_per_night * $amount_day;
        if (!empty($request->email)) {
            $user = User::where('email', '=', $request->email)->first();
        }
        $bill = [
            'billingCode' => $billing_code,
            'booking_id' => $create->_id,
            'user_id' => !empty($user) ? $user->_id : null,
            'services' => [],
            'total' => $total,
            // total = so ngay su dung phong * gia 1 dem
            'payment_method' => $request->payment_method,
            //thanh toan tai quay
            'payment_date' => Carbon::now()->format('Y-m-d H:i:s'),
            'branch_id' => $branch_id,
            'status' => config('status')[0]['id'],
        ];
        $data = $this->billing->create($bill);
        return [
            'message' => 'Đặt thành công !',
            'bill' => [
                'billingCode' => $billing_code,
                'total' => $total,
            ]
        ];
    }

    public function renew_booking($request)
    {
        // Đọc thông tin từ request
        $name = $request->name;
        $email = $request->email;
        $phone = $request->phone;
        $check_in = $request->check_in;
        $check_out = $request->check_out;
        $room_type_id = $request->room_type_id;
        $branch_id = $request->branch_id;
        $adults = $request->adults;
        $children = $request->children;
        $amount_room = $request->amount_room;

        // Kiểm tra sự có sẵn của phòng
        $available_rooms = $this->check_room($check_in, $check_out, $branch_id, $adults, $children, $room_type_id, $amount_room);

        // Kiểm tra xem có đủ số phòng cần đặt không
        if (count($available_rooms) < $amount_room) {
            return response()->json(['error' => 'Không đủ phòng trống !'], 400);
        }

        // Lấy ra danh sách phòng cần đặt
        $selected_rooms = array_slice($available_rooms, 0, $amount_room);

        // Tạo một mảng chi tiết đặt phòng
        $details = [];
        foreach ($selected_rooms as $room_id) {
            $details[] = [
                'room_id' => $room_id,
                'room_name' => Room::find($room_id)->name,
            ];
        }

        // Tạo đối tượng booking
        $booking = [
            'user' => [
                'name' => $name,
                'email' => $email,
                'phone' => $phone,
            ],
            'booking_date' => date('Y-m-d'),
            'check_in' => $check_in,
            'check_out' => $check_out,
            'room_type' => $room_type_id,
            'adults' => $adults,
            'children' => $children,
            'branch' => $branch_id,
            'detail' => $details,
        ];
        Booking::create($booking);
        return response()->json([
            'message' => 'Đặt phòng thành công !',
        ]);
    }

    public function addService($request)
    {
        $services = $request->services;
        $arrService = [];

        // Fetch billing record
        $billing = $this->billing->where('_id', '=', $request->billing_id)->first();
//        return $billing;
        $total = 0;
        if($billing->service !== null){
            foreach ($services as $key => $value) {
                $service = Services::find($value);

                // Check if the service already exists in billing
                $existingService = array_filter($billing->services, function ($item) use ($service) {
                    return $item['service_id'] == $service->_id;
                });

                if (empty($existingService)) {
                    $arrService[] = [
                        'service_id' => $service->_id,
                        'service_name' => $service->service_name,
                        'price' => $service->price,
                        'time' => Carbon::now()->format('Y-m-d H:i:s'),

                    ];
                    $total += $service->price;
                }
            }
            // Merge unique services
            $newArr = array_merge($billing->services, $arrService);
            // Update billing with the new services
            $this->billing->where('_id', '=', $request->billing_id)->update([
                'services' => $newArr,
                'total' => $billing->total + $total,
            ]);
        }
        else {
            foreach ($services as $key => $value) {
                $service = Services::find($value);
                $arrService[] = [
                    'service_id' => $service->_id,
                    'service_name' => $service->service_name,
                    'price' => $service->price,
                    'time' => Carbon::now()->format('Y-m-d H:i:s'),
                ];
                $total += $service->price;
            }
            $this->billing->where('_id', '=', $request->billing_id)->update([
                'services' => $arrService,
                'total' => $billing->total + $total,
            ]);
        }
        // Create history record
        $values = [
            'booking_id' => $request->billing_id,
            'admin_id' => $request->user()->id,
            'handle' => 'Thêm dịch vụ',
            'time' => Carbon::now()->format('Y-m-d H:i:s'),
        ];
        $this->history_handle->create($values);
        return [
            'status' => 'success',
            'message' => 'Thêm dịch vụ thành công !',
            'data' => $values
        ];
    }

    public function addPeople($request)
    {
        $billing = $this->billing->where('_id', '=', $request->billing_id)->first();
        if (!$billing) {
            return response()->json([
                'status' => 'error',
                'message' => 'Không tìm thấy hóa đơn !',
                'data' => null
            ]);
        }
        if ($billing->status != 3) {
            return response()->json([
                'status' => 'error',
                'message' => 'Chưa nhận phòng không thể thêm người !',
                'data' => null
            ]);
        }
        $this->booking->where('_id', '=', $billing->booking_id)->update([
            'people' => $request->peoples
        ]);
        $values = [
            'booking_id' => $request->billing_id,
            'admin_id' => $request->user()->id,
            'handle' => 'Bổ sung khách hàng',
            'time' => Carbon::now()->format('Y-m-d H:i:s'),
        ];
        $this->history_handle->create($values);
        return [
            'status' => 'success',
            'message' => 'Thêm người thành công !',
            'data' => $values
        ];
    }

    public function processCheckIn($request)
    {
        $billing = $this->billing->where('_id', '=', $request->billing_id)->first();
        if (!$billing) {
            return response()->json([
                'status' => 'error',
                'message' => 'Không tìm thấy hóa đơn !',
                'data' => null
            ]);
        }
        if (
            $billing->status == 2 ||
            $billing->status == 4 ||
            $billing->status == 5 ||
            $billing->status == 6 ||
            $billing->status == 7
        ) {
            return response()->json([
                'status' => 'error',
                'message' => 'Không thể nhận phòng !',
                'data' => null
            ]);
        }
        $this->billing->where('_id', $request->billing_id)->update([
            'status' => 3
        ]);
        $values = [
            'booking_id' => $request->billing_id,
            'admin_id' => $request->user()->id,
            'handle' => 'Nhận phòng',
            'time' => Carbon::now()->format('Y-m-d H:i:s'),
        ];
        $this->history_handle->create($values);
        return [
            'status' => 'success',
            'message' => 'Nhận phòng thành công !',
            'data' => $values
        ];
    }

    public function processCheckOut($request)
    {
        $billing = $this->billing->where('_id', '=', $request->billing_id)->first();
        if (!$billing) {
            return response()->json([
                'status' => 'error',
                'message' => 'Không tìm thấy hóa đơn !',
                'data' => null
            ]);
        }
        if ($billing->status != 3) {
            return response()->json([
                'status' => 'error',
                'message' => 'Không thể trả phòng !',
                'data' => null
            ]);
        }
        $this->billing->where('_id', '=', $request->billing_id)->update([
            'status' => 4
        ]);
        $values = [
            'booking_id' => $request->billing_id,
            'admin_id' => $request->user()->id,
            'handle' => 'Khách trả phòng',
            'time' => Carbon::now()->format('Y-m-d H:i:s'),
        ];
        $this->history_handle->create($values);
        return [
            'status' => 'success',
            'message' => 'Trả phòng thành công !',
            'data' => $values
        ];
    }

    public function cancelBooking($request)
    {
        $billing = $this->billing->where('_id', '=', $request->billing_id)->first();
        if (!$billing) {
            return response()->json([
                'status' => 'error',
                'message' => 'Không tìm thấy hóa đơn !',
                'data' => null
            ]);
        }
        if ($billing->status == 0 || $billing->status == 1) {
            $this->billing->where('_id', '=', $request->billing_id)->update([
                'status' => 2
            ]);
            $values = [
                'booking_id' => $request->billing_id,
                'admin_id' => $request->user()->id,
                'handle' => 'Hủy đặt phòng',
                'time' => Carbon::now()->format('Y-m-d H:i:s'),
            ];
            $this->history_handle->create($values);
            return [
                'status' => 'success',
                'message' => 'Huỷ phòng thành công !',
                'data' => $values
            ];
        }
        return response()->json([
            'status' => 'error',
            'message' => 'Không thể trả phòng !',
            'data' => null
        ]);
    }

    public function giaHan($request)
    {
        $soLuong = $request->soLuong;
        $room_id = $request->room_id;
        $branch_id = $request->branch_id;
        $room = Room::where('_id', '=', $room_id)->where('branch_id', '=', $branch_id)->first();
   

        $room_valid = $this-> check_room($request->checkin, $request->checkout, $branch_id, $request->adults, $request->children, $room->room_type_id, $soLuong);
        if (count($room_valid) < $soLuong) {
            return response()->json([
                'message' => 'Không đủ phòng trống !'
            ]);
        } else {
            $room_type = RoomType::where('_id', '=', $room->room_type_id)->first();
            $billing_id = $request->billing_id;
            $billing = $this->billing->find($billing_id);
            $booking = $this->booking->where('_id', '=', $billing->booking_id)->first();
            $bookDetail = $this->booking_detail->where('booking_id', $booking->id)->first();
            if ($room_id == $bookDetail->room_id) {
                $soNgay = Carbon::parse($booking->checkout)->diffInDays($request->newCheckOut) + 1;
                $total_price = $billing->total + (($room_type->price_per_night - $room->discount) * $soNgay);
                $this->billing->where('_id', '=', $request->billing_id)->update([
                    'total' => $total_price,
                ]);
                $this->booking->where('_id', '=', $billing->booking_id)->update([
                    'checkout' => $request->newCheckOut,
                ]);
                return response()->json([
                    'message' => 'Gia hạn thành công !'
                ]);
            } else {
                $this->billing->where('_id', '=', $request->billing_id)->update([
                    'status' => 4,
                ]);
                return $this->book($request);
            }
        }

       
    }

    public function checkBooking($request){
        $billing_id = $request->billing_id;
        $billing = $this->billing->where('_id', '=', $billing_id)->first();
        if (!$billing) {
            return response()->json([
                'status' => 'error',
                'message' => 'Không tìm thấy hóa đơn !',
                'data' => null
            ]);
        }
        return response()->json([
            'status' => 'success',
            'message' => 'Tìm thấy hóa đơn !',
            'data' => new BillingResource($billing)
        ]);
    }


}
