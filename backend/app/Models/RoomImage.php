<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use MongoDB\Laravel\Eloquent\Model as Eloquent;
use MongoDB\Laravel\Eloquent\SoftDeletes;

class RoomImage extends Eloquent
{
    use HasFactory;
    public $timestamps = false;
    protected $fillable = [
        'room_id',
        'image',
    ];
    protected $hidden = [
        'room_id',
        'created_at',
        'updated_at',
    ];

}
