<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Jenssegers\Mongodb\Eloquent\Model as Eloquent;

class Billing extends Eloquent
{
    use HasFactory;

    protected $fillable = [
        'booking_id',
        'services',
        'total',
        'payment_method',
        'payment_date',
        'branch_id',
        'status'
    ];

    public function getBooking(){
        return Booking::where('id', $this->booking_id)->first();
    }
    public function getService(){
        return  Services::where('id', $this->service_id)->first();
    }
}
