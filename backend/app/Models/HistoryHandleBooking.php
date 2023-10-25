<?php

namespace App\Models;

use Jenssegers\Mongodb\Eloquent\Model;

class HistoryHandleBooking extends Model
{
    protected $table = "history_handle";
    protected $fillable = [
        'booking_id',
        'admin_id',
        'handle',
        'time',
    ];
}
