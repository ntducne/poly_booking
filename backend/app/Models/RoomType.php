<?php

namespace App\Models;

use Jenssegers\Mongodb\Eloquent\Model as Eloquent;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Jenssegers\Mongodb\Eloquent\SoftDeletes;
class RoomType extends Eloquent
{
    use HasFactory, SoftDeletes;
    protected $fillable = [
        'room_type_name',
        'description',
        'price_per_night',
        'status',
    ];
    protected $attributes = [
        'deleted_at' => null,
        'status' => 0
    ];
}

