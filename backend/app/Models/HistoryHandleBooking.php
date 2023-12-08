<?php

namespace App\Models;

use MongoDB\Laravel\Eloquent\Model as Eloquent;
use MongoDB\Laravel\Eloquent\SoftDeletes;

class HistoryHandleBooking extends Eloquent
{
    protected $table = "history_handle";
    protected $fillable = [
        'booking_id',
        'admin_id',
        'handle',
        'time',
    ];
}
