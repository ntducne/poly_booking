<?php

namespace App\Models;

use Jenssegers\Mongodb\Eloquent\Model as Eloquent;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Jenssegers\Mongodb\Eloquent\SoftDeletes;


class Room extends Eloquent
{
    use HasFactory, SoftDeletes;
    protected $table = 'room';
    protected $fillable = [
        'room_type_id',
        'num_of_room',
        'single_room',
        'double_room',
        'room_name',
        'images',
    ];

    protected $attributes = [
        'deleted_at' => null,
    ];
}
