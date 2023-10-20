<?php

namespace App\Models;

use Jenssegers\Mongodb\Eloquent\Model;

class HistoryHandleBooking extends Model
{
    protected $fillable = [
        'booking_id',
        'admin_id',
        'handle',
        'created_at',
    ];
}
