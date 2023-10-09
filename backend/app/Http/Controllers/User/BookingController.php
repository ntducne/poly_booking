<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Booking;
use App\Models\BookDetail;
use App\Models\Room;

class BookingController extends Controller
{
    public function datPhong(Request $request)
    {
        $booking = new Booking();
        $soLuong = $request->soLuong;
        $room_id = $request->room_id; // id phong ma khach dat
        $branch_id = $request->branch_id;
        $room = Room::where('_id', '=', $room_id)->where('branch_id', '=', $branch_id)->get(); //tra ve du lieu phong ma khach muon dat
        //dat phong
        $param = $request->except(['soLuong', 'room_id', 'branch_id']);
        $price_per_night = 100000;
        $param['price_per_night'] = ($price_per_night == null ? 100000 : $price_per_night);
        $create = $booking->create($param);
        if ($create) {
            $bookDetail = new BookDetail();
            //neu so luong la 1
            $bookDetail->create(
                [
                    'booking_id' => $create->_id,
                    'room_id' => $room_id,
                    'room_name' => $room[0]->room_name,
                ]
            );
            $response = [
                'status' => 'success',
                'message' => 'Đặt thành công',
                'data' => $create,
            ];
            if ($soLuong > 1) {
                //danh sach phong lien quan den phong muon dat
                $listroom = Room::where('room_type_id', '=', $room[0]->room_type_id)->where('branch_id', '=', $branch_id)->where('_id', '!=', $room_id)->get();
                $count = 1;
                $arrRoom = []; // mang nay chua cac phong phu hop sau khi loc
                foreach ($listroom as $item1) {
                    //lay tat ca du lieu co cung room_id
                    $checkRoom = BookDetail::where('room_id', '=', $item1->_id)->get();
                    // dd($checkRoom);
                    if (empty($checkRoom)) { //kiem tra mang co rong hay ko
                        $arrRoom[] = $item1->_id;
                    } else {
                        $checkoutMax = 0;
                        $checkinMin = strtotime($request->checkin);
                        foreach ($checkRoom as $item) {
                            //lay ra check in check out cua phong theo book detail join booking
                            $checkBookingRoom = $booking->where('_id', '=', $item->booking_id)->where('status', '=', false)->get();
                            if ($checkoutMax < strtotime($checkBookingRoom[0]->checkout)) {
                                $checkoutMax = strtotime($checkBookingRoom[0]->checkout);
                            }
                            if ($checkinMin > strtotime($checkBookingRoom[0]->checkin)) {
                                $checkinMin = strtotime($checkBookingRoom[0]->checkin);
                            }
                        }
                        // dd([date('Y-m-d', $checkoutMax), date('Y-m-d', $checkinMin)]);
                        if (strtotime($create->checkout) < $checkinMin || $checkoutMax < strtotime($create->checkin)) { // kiem tra lich dat phong co
                            $arrRoom[] = $item1->_id;
                        }
                    }
                }
                foreach ($arrRoom as $key => $value) {
                    if ($count == $soLuong) {
                        return $response = [
                            'status' => 'success',
                            'message' => 'Đặt thành công',
                            'data' => $create,
                        ];
                    }
                    $bookDetail->create(
                        [
                            'booking_id' => $create->_id,
                            'room_id' => $value,
                            'room_name' => Room::find($value)->room_name,
                        ]
                    );
                    $count++;
                }
            }
        }
        return response()->json($response);
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
