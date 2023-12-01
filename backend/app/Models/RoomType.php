<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use MongoDB\Laravel\Eloquent\Model as Eloquent;
use MongoDB\Laravel\Eloquent\SoftDeletes;

class RoomType extends Eloquent
{
    use HasFactory, SoftDeletes;
    protected $fillable = [
        'room_type_name',
        'description',
        'price_per_night',
        // 'status',
        'branch_id'
    ];
    protected $attributes = [
        'deleted_at' => null,
        'status' => 0
    ];
    protected $hidden = [
        'deleted_at',
        'created_at',
        'updated_at',
    ];
}

