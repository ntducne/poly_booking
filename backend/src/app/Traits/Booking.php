<?php
namespace App\Traits;
trait Booking {
    public function bookingHistory()
    {
        return $this->bookings->all();
    }

}
