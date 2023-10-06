<?php

namespace App\Models;

use Jenssegers\Mongodb\Eloquent\Model as Eloquent;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Jenssegers\Mongodb\Eloquent\SoftDeletes;

class Category extends Eloquent
{
    use HasFactory, SoftDeletes;
    protected $fillable = [
        'name_category',
        'status',
        'deleted_at'
    ];
    protected $attributes = [
        'status'  => 0,
        'deleted_at' => null
    ];
}
