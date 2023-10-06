<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Room;
use App\Models\Booking;
use App\Models\BookDetail;
use Illuminate\Http\Request;

class RoomController extends Controller
{
    private Room $room;
    public function __construct()
    {
        $this->room = new Room();
    }
    public function room_detail($id)
    {
        $room = Room::find($id);
        //kiem tra phong trong hay khong
        $checkRoom = BookDetail::where('room_id', $id)->get();
        $maxCheckout = strtotime(date("Y-m-d")); //thoi gian hien tai 
        foreach ($checkRoom as $item) {
            $checkBookingRoom = Booking::find($item->booking_id);
            if ($maxCheckout < strtotime($checkBookingRoom->checkout)) {
                $maxCheckout = strtotime($checkBookingRoom->checkout);
            }
        }
        $checkTime = $maxCheckout < strtotime(date("Y-m-d")) ? 'Còn phòng' : 'Hết phòng';
        //danh sach phong lien quan 
        $listroom = Room::where('room_type_id', '=', $room->room_type_id)->where('_id', '!=', $id)->get(); //danh sach phong lien quan den phong muon dat 
        if ($room) {
            $response = [
                'status' => 'Success',
                'data' => [
                    'Detail_room' => [
                        'info_room' => $room,
                        'note_room' => $checkTime . ' đến ngày ' . date("Y-m-d", $maxCheckout)
                    ],
                    'Same_room' => $listroom
                ]
            ];
        }
        return response()->json($response);
    }
}