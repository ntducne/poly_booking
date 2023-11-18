<?php

namespace App\Http\Controllers;

use App\Http\Resources\RoomResource;
use App\Models\Booking;
use App\Models\Room;
use App\Models\RoomType;
use Illuminate\Http\Request;

class DemoController extends Controller
{
    public function search(Request $request)
    {
        $adults = $request->adults;
        $children = $request->children;
        $branch_id = $request->branch_id;
        $amount_room = $request->amount_room;
        $checkin = $request->checkin;
        $checkout = $request->checkout;

        //Dieu kien 1 
        $room = Room::where('adults', '=', ceil($adults / $amount_room))
            ->where('children', '=', ceil($children / $amount_room))->get();
        if (count($room) == 0) {
            return response()->json(
                [
                    'status' => 'Error',
                    'message' => 'khong co phong nao '
                ]

            );
        }
        //Dieu kien 2 

        $room_type = [];
        foreach ($room as $key => $value) {
            $room_type[] = $value['room_type_id'];
        }
        $room_type = array_unique($room_type);
        $room_booked = [];
        foreach ($room_type as $key => $value) {
            $booking = Booking::where(function ($query) use ($checkin, $checkout) {
                $query->where(function ($query) use ($checkin, $checkout) {
                    $query->where('checkin', '>=', $checkin)
                        ->where('checkout', '<=', $checkout);
                })
                    ->orWhere(function ($query) use ($checkin, $checkout) {
                        $query->where('checkin', '<=', $checkin)
                            ->where('checkout', '>=', $checkout);
                    })
                    ->orWhere(function ($query) use ($checkin, $checkout) {
                        $query->where('checkin', '>=', $checkin)->where('checkin', '<', $checkout)->where('checkout', '>=', $checkout);
                    })
                    ->orWhere(function ($query) use ($checkin, $checkout) {
                        $query->where('checkin', '<=', $checkin)->where('checkout', '>', $checkin)->where('checkout', '<=', $checkout);
                    });
            })->where('room_type', '=', $value)->get();
            foreach ($booking as $item) {
                $room_booked[] = $item->_id;
            }
        }
        if (!$room_booked) {
            $room_valid = [];
            foreach ($room as $key => $value) {
                $room_valid[] = new RoomResource(Room::find($value->_id));
            }
            return response()->json(
                [
                    'status' => 'Success',
                    'message' => 'tim thanh cong',
                    'data' => $room_valid
                ]
            );
        }
        return response()->json(
            [
                'status' => 'Error',
                'message' => 'khong co phong nao '
            ]

        );
    }
}
