<?php

namespace App\Models;

use Jenssegers\Mongodb\Eloquent\Model as Eloquent;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Jenssegers\Mongodb\Eloquent\SoftDeletes;

class Branch extends Eloquent
{
    use HasFactory, SoftDeletes;
    protected $fillable = [
        'name',
        'address',
        'phone',
        'deleted_at'
    ];
    protected $attributes = [
        'deleted_at' => null
    ];
    protected $hidden = [
        'deleted_at',
        'created_at',
        'updated_at',
    ];
}
