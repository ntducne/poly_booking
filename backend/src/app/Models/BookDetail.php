<?php

namespace App\Models;

use Jenssegers\Mongodb\Eloquent\Model as Eloquent;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Jenssegers\Mongodb\Eloquent\SoftDeletes;

class BookDetail extends Eloquent
{
    use HasFactory,SoftDeletes;
    protected $fillable = [
        'booking_id',
        'room_id',
        'room_type',
        'room_name',
        'price_per_night',
        'deleted_at'
    ];
    protected $attributes = [
        'deleted_at' => null
    ];
}
