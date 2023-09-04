<?php

namespace App\Models;

use Jenssegers\Mongodb\Eloquent\Model as Eloquent;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Jenssegers\Mongodb\Eloquent\SoftDeletes;

class Room extends Eloquent
{
    use HasFactory,SoftDeletes;
    protected $fillable = [
        'room_type_id',
        'num_of_room',
        'single_bed',
        'double_bed',
        'room_name',
        'deleted_at'
    ];
    protected $attributes = [
        'deleted_at' => null
    ];
}
