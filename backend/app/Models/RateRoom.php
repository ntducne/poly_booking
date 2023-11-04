<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use MongoDB\Laravel\Eloquent\Model as Eloquent;
use MongoDB\Laravel\Eloquent\SoftDeletes;

class RateRoom extends Eloquent
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
