<?php

namespace App\Http\Controllers;

use App\Http\Resources\RoomResource;
use App\Models\BookDetail;
use App\Models\Booking;
use App\Models\Rates;
use App\Models\Room;
use App\Models\RoomType;
use Illuminate\Http\Request;

class ClientController extends Controller
{
    public function __construct()
    {
        $this->booking = new Booking();
        $this->book_detail = new BookDetail();
    }

    public function roomType()
    {
        return response()->json(RoomType::all());
    }

    public function rooms()
    {
        return RoomResource::collection(Room::paginate(10));
    }

    public function roomDetail($id)
    {
        $room = Room::find($id);
        if (!$room) {
            return response()->json([
                'status' => 'error',
                'message' => 'Phòng không tồn tại !',
            ]);
        }
        return response()->json([
            'room' => new RoomResource($room),
            'rate' => $room->getRate()
        ]);
    }
    public function search(Request $request)
    {
        //Check qua thoi gian ben Booking
        $room_booked = $this->booking
            ->where('checkin', '>=', $request->checkin)
            ->where('checkout', '<=', $request->checkout)
            ->where('status', '=', false)
            ->get();
        //Chua id cac room da dat 
        $room_id_booked = [];
        foreach ($room_booked as $item) {
            $room_bookdetail = $this->book_detail->where('booking_id', '=', $item->_id)->get();
            foreach ($room_bookdetail as $room) {
                $room_id_booked[] = Room::find($room->room_id)->_id;
            }
        }
        //Danh sach cac room 
        $room = Room::where('adults', '=', $request->adult)
            ->where('children', '=', $request->child)
            ->where('branch_id', '=', $request->branch_id)
            ->get();
        $room_id_completed = [];
        foreach ($room as $item) {
            if (!in_array($item->_id, $room_id_booked)) {
                $room_id_completed[] = $item->_id;
            }
        }
        $room_completed = [];
        foreach ($room_id_completed as $item => $value) {
            $room_completed[] = Room::find($value);
        }
        if ($room_completed = []) {
            $response = [
                'message'=>'Hết phòng '
            ];
        }else {
            $response = [
                'message' => 'Tìm thành công',
                'data' => $room_completed
            ];
        }
        return response()->json($response);
    }
    public function booking(Request $request)
    {
        $booking = new Booking();
        $soLuong = $request->soLuong;
        $room_id = $request->room_id;
        $branch_id = $request->branch_id;
        $param = $request->except(['soLuong', 'room_id', 'branch_id', 'adult', 'child']);
        $room = Room::where('_id', '=', $room_id)->where('branch_id', '=', $branch_id)->get();
        $param['booking_date'] = now()->toDateTimeString();
        $param['price_per_night'] = RoomType::find($room[0]->room_type_id)->price_per_night;
        $create = $booking->create($param);
        if ($create) {
            $bookDetail = new BookDetail();
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
                $listroom = Room::where('room_type_id', '=', $room[0]->room_type_id)
                    ->where('branch_id', '=', $branch_id)
                    ->where('adults', '=', $request->adult)
                    ->where('children', '=', $request->child)
                    ->where('_id', '!=', $room_id)
                    ->get();
                $count = 1;
                $arrRoom = [];
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
                            $checkBookingRoom = $booking->where('_id', '=', $item->booking_id)->where('status', '=', false)->get();
                            if ($checkoutMax < strtotime($checkBookingRoom[0]->checkout)) {
                                $checkoutMax = strtotime($checkBookingRoom[0]->checkout);
                            }
                            if ($checkinMin > strtotime($checkBookingRoom[0]->checkin)) {
                                $checkinMin = strtotime($checkBookingRoom[0]->checkin);
                            }
                        }
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
}