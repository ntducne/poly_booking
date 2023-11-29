<?php

namespace App\Repositories\Stats;

use App\Models\Billing;
use App\Models\BookDetail;
use App\Models\Booking;
use Carbon\Carbon;

class Room {
    
    private Billing $billing;
    private Booking $booking;
    private BookDetail $bookDetail;
    private Room $room;

    public function __construct()
    {
        $this->billing = new Billing();
        $this->booking = new Booking();
        $this->bookDetail = new BookDetail();
        $this->room = new Room();
    }

    public function getBilliing($request){
        return $this->billing->whereIn('status', array_map(function ($item) { 
            return (int)$item; 
        }, $request->status))->get();
    }

    public function daily($request)
    {
        // $totalRoom = 0;
        // foreach ($this->room->all() as $value) {
        //     $totalRoom += count($value->room_number);
        // }
        // $totalRoomBook = 0;
        // $now = Carbon::now();
        // $billing = $this->getBilliing($request);
        // foreach ($billing as $value) {
        //     $booking = $this->booking->find($value->booking_id);
        //     if($now->between($booking->checkin, $booking->checkout)){
        //         $bookDetail = $this->bookDetail->where('booking_id', $value->booking_id)->get();
        //         $totalRoomBook = count($bookDetail);
        //     }
        // }
        // return [
        //     'room_is_book' => $totalRoomBook,
        //     'room_is_not_book' => $totalRoom - $totalRoomBook
        // ];
    }
}