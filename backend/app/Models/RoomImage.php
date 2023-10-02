<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Notifications\Notifiable;
use Illuminate\Auth\Authenticatable;
use Illuminate\Support\Facades\Storage;
use Jenssegers\Mongodb\Eloquent\Model as Eloquent;
class RoomImage extends Eloquent
{
    use HasFactory;
    public $timestamps = false;
    protected $fillable = [
        'room_id',
        'image',
    ];

}
