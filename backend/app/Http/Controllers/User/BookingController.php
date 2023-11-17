<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Billing;
use App\Models\RoomType;
use App\Models\User;
use Illuminate\Http\Request;
use App\Models\Booking;
use App\Models\BookDetail;
use App\Models\Room;

class  BookingController extends Controller
{
    public function __construct()
    {
        $this->booking = new Booking();
        $this->book_detail = new BookDetail();
    }
    public function datPhong(Request $request)
    {
        $soLuong = $request->soLuong;
        $room_id = $request->room_id;
        $branch_id = $request->branch_id;
        (int) $adults = $request->adults;
        (int) $children = $request->children;
        $param = $request->except(['soLuong', 'room_id', 'branch_id', 'adult', 'child']);
        $room = Room::where('_id', '=', $room_id)->where('branch_id', '=', $branch_id)->first();
        //Kiem tra phong con trong hay khong
        $room_valid = $this->check_room($request->checkin, $request->checkout, $request->adults, $request->children, $branch_id, $room->room_type_id);
        $total_adults = 0;
        $total_children = 0;
        $total_discount = 0;
        $total_price_per_night = 0;
        foreach ($room_valid as $key => $value) {
            $total_adults += Room::find($value)->adults;
            $total_children += Room::find($value)->children;
            $total_discount += Room::find($value)->discount;
            $total_price_per_night += RoomType::where('_id', '=', Room::find($value)->room_type_id)->first()->price_per_night;
        }
        //Bat loi dat so nguoi
        if ($adults > $total_adults && $children > $total_children) {
            return response()->json([
                'message' => 'Phòng không đủ chỗ '
            ]);
        }
        //Bat loi dat so luong phong
        if (count($room_valid) < $soLuong) {
            return response()->json([
                'message' => 'Không đủ phòng trống !'
            ]);
        }

        $param['room_type'] = $room->room_type_id;
        $param['booking_date'] = now()->toDateTimeString();
        $param['price_per_night'] = $total_price_per_night - $total_discount; // gia 1 dem cua booking
        $param['amount_people'] = [
            'total_people' => $total_adults + $total_children,
            'total_adults' => $total_adults,
            'total_children' => $total_children
        ];
        $param['amount_room'] = $soLuong;
        //Lay ra id user neu ho da co tai khoan tu truoc
        $user = User::where('email', '=', $request->representative['email'])->first();
        $param['user_id'] = !empty($user) ? $user->_id : null;

        //phong co the dat
        $room_booking = array_slice($room_valid, 0, $soLuong);
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
        $amount_day = floor($datediff / (60 * 60 * 24));
        // so luong ngay
        $bill = [
            'booking_id' => $create->_id,
            'services' => [],
            'total' => $param['price_per_night'] * $amount_day,
            // total = so ngay su dung phong * gia 1 dem
            'payment_method' => 0,
            //thanh toan tai quay
            'payment_date' => null,
            'branch_id' => $branch_id
        ];
        $billing = Billing::create($bill);

        return response()->json([
            'message' => 'Đặt thành công !',
            'booking' => $create,
            'details' => $details,
            'bill' => $billing
        ]);
    }
    public function huyPhong(Request $request, $id)
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
}
