<?php

namespace App\Repositories;

use App\Models\Billing;
use App\Models\BookDetail;
use App\Models\Booking;
use App\Models\HistoryHandleBooking;
use App\Models\Room;
use App\Models\RoomType;
use App\Models\Services;
use App\Models\User;
use App\Modules\Orders\Resources\BillingResource;
use App\Modules\Room\Resources\RoomResource;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Support\Carbon;

class BookingRepository
{
    private Booking $booking;
    private Billing $billing;
    private HistoryHandleBooking $history_handle;

    public function __construct()
    {
        $this->booking = new Booking();
        $this->billing = new Billing();
        $this->history_handle = new HistoryHandleBooking();
    }

    public function orderList($request): AnonymousResourceCollection
    {
        $billing = $this->billing->where('branch_id', '=', $request->user()->branch_id)->newQuery();
        if($request->billingCode){
            $billing->where('billingCode', +$request->billingCode);
        }
        if($request->status != ''){
            $billing->where('status', +$request->status);
        }
        if($request->checkin){
            $booking = $this->booking->where('checkin', Carbon::parse($request->checkin)->addHour(14)->format('Y-m-d H:i:s'))->get();
            $booking_id = [];
            foreach ($booking as $key => $value) {
                $booking_id[] = $value->_id;
            }
            $billing->whereIn('booking_id', $booking_id);
        }
        if($request->checkout){
            $booking = $this->booking->where('checkout', Carbon::parse($request->checkout)->addHour(12)->format('Y-m-d H:i:s'))->get();
            $booking_id = [];
            foreach ($booking as $key => $value) {
                $booking_id[] = $value->_id;
            }
            $billing->whereIn('booking_id', $booking_id);
        }
        if($request->user_info){
            $booking = $this->booking
            ->where('representative.name', 'like', '%'.$request->user_info.'%')
            ->orWhere('representative.email', 'like', '%'.$request->user_info.'%')
            ->orWhere('representative.phone', 'like', '%'.$request->user_info.'%')
            ->get();
            $booking_id = [];
            foreach ($booking as $key => $value) {
                $booking_id[] = $value->_id;
            }
            $billing->whereIn('booking_id', $booking_id);
        }
        if($request->booking_date){
            $booking = $this->booking->where('booking_date', Carbon::parse($request->booking_date)->format('Y-m-d'))->get();
            $booking_id = [];
            foreach ($booking as $key => $value) {
                $booking_id[] = $value->_id;
            }
            $billing->whereIn('booking_id', $booking_id);
        }
        return BillingResource::collection($billing->orderBy('id', 'desc')->paginate(10));
    }

    public function orderSearchItem($request)  {
        $billing = $this->billing
        ->where('branch_id', '=', $request->user()->branch_id)
        ->where('billingCode','=',(int)$request->billingCode)->first();
        if (!$billing) {
            return response()->json(
                [
                    'status'=>'Error',
                    'message'=>'Mã hóa đơn không tồn tại !'
                ]
            );
        }
        return new BillingResource($billing);
    }
    
    public function orderDetail($request, $id): BillingResource
    {
        $billingId =  $this->billing
            ->where('branch_id', '=', $request->user()->branch_id)
            ->where('_id', $id)
            ->first();

        $billingCode = $this->billing
                ->where('branch_id', '=', $request->user()->branch_id)
                ->where('billingCode', +$id)
                ->first();

        if($billingId){
            return new BillingResource(
                $billingId 
            );
        }
        if($billingCode){
            return new BillingResource(
                $billingCode 
            );
        }
    }

    public function addService($request)
    {
        $services = $request->services;
        $arrService = [];
        $billing = $this->billing->where('_id', '=', $request->billing_id)->where('branch_id', '=', $request->user()->branch_id)->first();
        $total = 0;
        if(count($billing->services) > 0){
            foreach ($services as $key => $value) {
                $service = Services::where('_id', '=', $value['service_id'])->where('branch_id', '=', $request->user()->branch_id)->first();
                    $arrService[] = [
                        'service_id' => $service->_id,
                        'service_name' => $service->service_name,
                        'price' => $service->price,
                        'time' => Carbon::now()->format('Y-m-d H:i:s'),
                        'isPay' => 0,
                        'quantity' => $value['quantity'] ?? 1,
                    ];
                    $total += $service->price;
            }
            $newArr = array_merge($billing->services, $arrService);
            $this->billing->where('_id', '=', $request->billing_id)->update([
                'services' => $newArr,
                'total' => $billing->total + $total,
            ]);
        }
        else {
            foreach ($services as $key => $value) {
                $service = Services::where('_id', '=', $value['service_id'])->where('branch_id', '=', $request->user()->branch_id)->first();
                $arrService[] = [
                    'service_id' => $service->_id,
                    'service_name' => $service->service_name,
                    'price' => $service->price,
                    'time' => Carbon::now()->format('Y-m-d H:i:s'),
                    'isPay' => 0,
                    'quantity' => $value['quantity'] ?? 1,
                ];
                $total += $service->price;
            }
            $this->billing->where('_id', '=', $request->billing_id)->update([
                'services' => $arrService,
                'total' => $billing->total + $total,
            ]);
        }
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
        $billing = $this->billing->where('_id', '=', $request->billing_id)->where('branch_id', '=', $request->user()->branch_id)->first();
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
        $booking = $this->booking->where('_id', '=', $billing->booking_id)->first();
        $booking_old_people = $booking->people;
        if($booking_old_people !== null){
            $newPeople = array_merge($booking_old_people, $request->peoples);
            $this->booking->where('_id', '=', $billing->booking_id)->update([
                'people' => $newPeople
            ]);
        }
        else {
            $this->booking->where('_id', '=', $billing->booking_id)->update([
                'people' => $request->peoples
            ]);
        }
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
        $billing = $this->billing->where('_id', '=', $request->billing_id)->where('branch_id', '=', $request->user()->branch_id)->first();
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
        $this->billing->where('_id', $request->billing_id)->where('branch_id', '=', $request->user()->branch_id)->update([
            'status' => 3
        ]);
        $booking_id = $billing->booking_id;
        BookDetail::where('booking_id', $booking_id)->update([
            'status' => 1
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
        $billing = $this->billing->where('_id', '=', $request->billing_id)->where('branch_id', '=', $request->user()->branch_id)->first();
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
        // lấy các service trong billing và kiểm tra nếu isPay = 0 thì cập nhật lên 1
        $services = $billing->services;
        foreach ($services as $key => $value) {
            if($value['isPay'] == 0){
                $services[$key]['isPay'] = 1;
            }
        }
        $this->billing->where('_id', '=', $request->billing_id)->where('branch_id', '=', $request->user()->branch_id)->update([
            'services' => $services
        ]);
        $this->billing->where('_id', '=', $request->billing_id)->where('branch_id', '=', $request->user()->branch_id)->update([
            'status' => 4
        ]);
        $booking_id = $billing->booking_id;
        BookDetail::where('booking_id', $booking_id)->update([
            'status' => 2
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
        $billing = $this->billing->where('_id', '=', $request->billing_id)->where('branch_id', '=', $request->user()->branch_id)->first();
        if (!$billing) {
            return response()->json([
                'status' => 'error',
                'message' => 'Không tìm thấy hóa đơn !',
                'data' => null
            ]);
        }
        if ($billing->status == 0 || $billing->status == 1) {
            $this->billing->where('_id', '=', $request->billing_id)->where('branch_id', '=', $request->user()->branch_id)->update([
                'status' => 2
            ]);
            $booking_id = $billing->booking_id;
            BookDetail::where('booking_id', $booking_id)->update([
                'status' => 3
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

    public function checkBooking($request){
        $billing_id = $request->billing_id;
        $billing = $this->billing
            ->where('_id', '=', $billing_id)
            ->orWhere('billingCode', '=', $billing_id)
            ->first();
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
            $book_detail = BookDetail::where('booking_id', '=', $item->_id)->get();
            foreach ($book_detail as $key => $value) {
                $room_id_booked[] = $value->room_id;
            }
        }
        $room = Room::where('adults', '=', ceil($adults / $amount_room))
            ->where('children', '=', ceil($children / $amount_room))
            ->where('branch_id', '=', $branch_id)
            ->where('room_type_id', '=', $room_type_id)
            ->get();
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

    public function book($request): bool
    {
        $condition = ($request->user()->role == 1 || $request->user()->role == 2) && $request->user()->branch_id != 'all';
        if ($condition) {
            $branch = $request->user()->branch_id;
        } else {
            $branch = $request->branch_id;
        }
        $amount_room = $request->amount_room;
        $branch_id = $request->branch_id;
        (int) $adults = $request->adults;
        (int) $children = $request->children;
        $param = $request->except(['soLuong', 'room_id', 'branch_id', 'adult', 'child']);
        $room_valid = $this->check_room($request->checkin, $request->checkout, $branch_id, $request->adults, $request->children, $request->room_type_id, $amount_room);
        if (count($room_valid) < $amount_room) {
            return false;
        }
        $room_booking = array_slice($room_valid, 0, $amount_room);
        $total_discount = 0;
        $total_price_per_night = 0;
        foreach ($room_booking as $key => $value) {
            $total_discount += Room::find($value)->discount;
            $total_price_per_night += RoomType::where('_id', '=', Room::find($value)->room_type_id)->first()->price_per_night;
        }
        $param['room_type'] = $request->room_type_id;
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
        $param['amount_room'] = $amount_room;
        $param['status'] = config('status')[0]['id'];
        $create = $this->booking->create($param);
        $details = [];
        foreach ($room_booking as $key => $value) {
            BookDetail::create(
                [
                    'booking_id' => $create->_id,
                    'room_id' => $value,
                    'room_name' => Room::find($value)->name
                ]
            );
        }
        $datediff = abs(strtotime($request->checkin) - strtotime($request->checkout));
        $amount_day = floor($datediff / (60 * 60 * 24)); // so ngay khach hang dat
        if (!empty($request->email)) {
            $user = User::where('email', '=', $request->email)->first();
        }
        $bill = [
            'billingCode' => random_int(1, 10000),
            'booking_id' => $create->_id,
            'user_id' => !empty($user) ? $user->_id : null,
            'services' => [],
            'total' => $create->price_per_night * $amount_day,
            'payment_method' => $request->payment_method,
            'payment_date' => null,
            'branch_id' => $branch_id,
            'status' => config('status')[0]['id']
        ];
        $data = $this->billing->create($bill);
        if ($condition) {
            $this->history_handle->create([
                'booking_id' => $create->_id,
                'admin_id' => $request->user()->id,
                'handle' => 'Tạo mới đặt phòng',
                'time' => date("Y-m-d"),
            ]);
        }
        return true;
    }
}