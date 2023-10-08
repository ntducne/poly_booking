<?php

namespace App\Models;

use Jenssegers\Mongodb\Eloquent\Model as Eloquent;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Jenssegers\Mongodb\Eloquent\SoftDeletes;

class Rates extends Eloquent
{
    use HasFactory, SoftDeletes;
     protected $table = "rates";
    protected $fillable = [
        'user_id',
        'content',
        'rate_at',
        'images',
        'star',
        'deleted_at',
        'room_id'
    ];
    protected $attributes = [
        'deleted_at' => null
    ];
}
