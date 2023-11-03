<?php

namespace App\Http\Controllers;

use App\Http\Requests\Booking\BookingRequest;
use App\Http\Requests\Booking\SearchRequest;
use App\Http\Resources\BranchResource;
use App\Http\Resources\RoomResource;
use App\Models\Billing;
use App\Models\BookDetail;
use App\Models\Booking;
use App\Models\Branch;
use App\Models\Rates;
use App\Models\Room;
use App\Models\RoomType;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class ClientController extends Controller
{
    public function __construct()
    {
        $this->booking = new Booking();
        $this->book_detail = new BookDetail();
        $this->billing = new Billing();
    }

    public function branch()
    {
        return BranchResource::collection(Branch::all());
    }

    public function roomType()
    {
        return RoomResource::collection(RoomType::all());
    }

    public function rooms(Request $request)
    {
        if (
            request()->has('checkin')
            && request()->has('checkout')
            && request()->has('adult')
            && request()->has('child')
            && request()->has('branch_id')
            && request()->has('soLuong')
        ) {
            $room_completed = $this->check_room($request->checkin, $request->checkout, $request->adult, $request->child, $request->branch_id, null, $request->soLuong);
            if (!$room_completed) {
                $response = [
                    'message' => 'Hết phòng !'
                ];
            } else {
                $room = [];
                foreach ($room_completed as $value) {
                    $room[] = [
                        'room' => Room::find($value),
                        'room_type' => RoomType::where('_id', '=', Room::find($value)->room_type_id)->get()
                    ];
                }
                $response = [
                    'message' => 'Tìm thành công !',
                    'data' => $room
                ];
            }
            return response()->json($response);
        }
        return RoomResource::collection(Room::paginate(10));
    }

    public function roomDetail($id)
    {
        $room = Room::where('slug', '=', $id)->first();
        if (!$room) {
            return response()->json([
                'status' => 'error',
                'message' => 'Phòng không tồn tại !',
            ]);
        }
        $room_same = Room::where('room_type_id', '=', $room->room_type_id)
            ->where('branch_id', '=', $room->branch_id)
            ->where('_id', '!=', $id)
            ->get();
        return response()->json([
            'room' => new RoomResource($room),
            'rate' => $room->getRate(),
            'room_same' => RoomResource::collection($room_same)
        ]);
    }
    public function check_room($check_in, $check_out, $adults, $children, $branch_id, $room_type_id = null, $soLuong = 1)
    {
        //Check qua thoi gian ben Booking
        $room_booked = $this->booking
            ->where('status', '=', false)
            // ->where('room_type', $room_type_id)
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
            $book_detail = $this->book_detail->where('booking_id', '=', $item->_id)->get();
            foreach ($book_detail as $key => $value) {
                $room_id_booked[] = $value->room_id;
            }
        }
        //Danh sach cac room
        $room = Room::where('adults', '=', ceil($adults / $soLuong))
            ->where('children', '=', ceil($children / $soLuong))
            ->where('branch_id', '=', $branch_id);
        if ($room_type_id != null) {
            $room->where('room_type_id', '=', $room_type_id);
        }
        $room = $room->get();
        //Danh sach cac phong thoa man adult va children
        $room_id_completed = [];
        foreach ($room as $item) {
            if (!in_array($item->_id, $room_id_booked)) {
                $room_id_completed[] = $item->_id;
            }
        }
        return $room_id_completed;
    }
    public function search(Request $request)
    {
        try {
            if (
                request()->has('checkin')
                && request()->has('checkout')
                && request()->has('adult')
                && request()->has('child')
                && request()->has('branch_id')
                && request()->has('soLuong')
            ) {
                $room_completed = $this->check_room($request->checkin, $request->checkout, $request->adult, $request->child, $request->branch_id, null, $request->soLuong);
                if (!$room_completed) {
                    $response = [
                        'message' => 'Hết phòng !'
                    ];
                } else {
                    $room = [];
                    foreach ($room_completed as $key => $value) {
                        $room[] = new RoomResource(Room::find($value));
                    }
                    $response = [
                        'message' => 'Tìm thành công !',
                        'data' => $room
                    ];
                }
                return response()->json($response);
            }
        } catch (Exception $exception) {
            Log::debug($exception->getMessage());
            return response()->json([
                'status' => false,
                'message' => 'Lỗi không thực hiện được tìm kiếm !'
            ]);
        }

    }
    public function booking(BookingRequest $request)
    {
        try {
            $soLuong = $request->soLuong;
            $room_id = $request->room_id;
            $branch_id = $request->branch_id;
            (int) $adults = $request->adults;
            (int) $children = $request->children;
            $param = $request->except(['soLuong', 'room_id', 'branch_id', 'adult', 'child']);
            $room = Room::where('_id', '=', $room_id)->where('branch_id', '=', $branch_id)->first();
            //Kiem tra phong con trong hay khong
            $room_valid = $this->check_room($request->checkin, $request->checkout, $request->adults, $request->children, $branch_id, $room->room_type_id, $soLuong);
            //Bat loi dat so luong phong
            if (count($room_valid) < $soLuong) {
                return response()->json([
                    'message' => 'Không đủ phòng trống !'
                ]);
            }
            //phong co the dat
            $room_booking = array_slice($room_valid, 0, $soLuong);
            // $total_adults = 0;
            // $total_children = 0;
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
            //Lay ra id user neu ho da co tai khoan tu truoc
            if (!empty($request->email)) {
                $user = User::where('email', '=', $request->email)->first();
            }
            $param['user_id'] = !empty($user) ? $user->_id : null;
            $create = $this->booking->create($param);
            $details = [];
            foreach ($room_booking as $key => $value) {
                $details[] = [
                    'booking_detail' => $this->book_detail->create(
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
            $bill = [
                'billingCode' => $request->billingCode,
                'booking_id' => $create->_id,
                'services' => [],
                'total' => $create->price_per_night * $amount_day,
                // total = so ngay su dung phong * gia 1 dem
                'payment_method' => $request->payment_method,
                //thanh toan tai quay
                'payment_date' => null,
                'branch_id' => $branch_id,
                'status' => 'Not yet implemented'
            ];
            $data = $this->billing->create($bill);

            return response()->json([
                'message' => 'Đặt thành công !',
                'booking' => $create,
                'details' => $details,
                'bill' => $data
            ]);
        } catch (Exception $exception) {
            Log::debug($exception->getMessage());
            return response()->json([
                'status' => false,
                'message' => 'Lỗi không thực hiện được đặt phòng !'
            ]);
        }

    }
}
