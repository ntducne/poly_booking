<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Jenssegers\Mongodb\Eloquent\Model;


class RateRoom extends Model
{
    use HasFactory;
    protected $fillable = [
        'room_id',
        'user_id',
        'images',
        'rate',
        'comment',
    ];

}
