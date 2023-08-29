<?php

namespace App\Models;

use Jenssegers\Mongodb\Eloquent\Model as Eloquent;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Jenssegers\Mongodb\Eloquent\SoftDeletes;

class Booking extends Eloquent
{
    use HasFactory, SoftDeletes;
    protected $fillable = [
        'user_id',
        'booking_date',
        'checkin',
        'checkout',
        'pay_date',
        'representative',
        'amount_of_people',
        'deleted_at'
    ];
    protected $attributes = [
        'deleted_at' => null
    ];
}