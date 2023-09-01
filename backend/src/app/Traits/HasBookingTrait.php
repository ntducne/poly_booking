<?php
namespace App\Traits;
trait HasBookingTrait {
    public function bookingHistory()
    {
        return $this->bookings->all();
    }

}
