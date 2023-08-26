<?php

namespace App\Models;

use Jenssegers\Mongodb\Eloquent\Model as Eloquent;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Jenssegers\Mongodb\Eloquent\SoftDeletes;

class Staff extends Eloquent
{
    use HasFactory, SoftDeletes;
    protected $table = 'staffs';
    protected $fillable = [
        'fullname',
        'email',
        'password',
        'phone',
        'address',
        'image',
        'active',
    ];

    protected $attributes = [
        'deleted_at' => null,
    ];
}
