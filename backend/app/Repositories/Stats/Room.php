<?php

namespace App\Repositories\Stats;

use App\Models\Billing;
use App\Models\BookDetail;
use App\Models\Booking;
use App\Models\Room as ModelsRoom;
use Carbon\Carbon;

class Room {
    
    private Billing $billing;
    private Booking $booking;
    private BookDetail $bookDetail;
    private ModelsRoom $room;

    public function daily()
    {
        $this->billing = new Billing();
        $this->booking = new Booking();
        $this->bookDetail = new BookDetail();
        $this->room = new ModelsRoom();
        $totalRoom = 0;
        foreach ($this->room->all() as $value) {
            $totalRoom += count($value->room_number);
        }
        $totalRoomBook = 0;
        $now = Carbon::parse(Carbon::now()->format('Y-m-d'));
        $billing = $this->billing->where('status', 3)->get();
        $booking = $this->booking->whereIn('_id', $billing->pluck('booking_id')->toArray())->get();
        foreach ($booking as $value) {
            if($now->between(Carbon::parse($value->checkin)->format('Y-m-d'), Carbon::parse($value->checkout)->format('Y-m-d'))){
                $bookDetail = $this->bookDetail->where('booking_id', $value->_id)->get();
                $totalRoomBook += count($bookDetail);
            }
        }
        return [
            'total_room' => $totalRoom,
            'room_is_book' => $totalRoomBook,
            'room_is_not_book' => $totalRoom - $totalRoomBook
        ];
    }
}