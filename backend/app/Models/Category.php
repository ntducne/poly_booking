<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use MongoDB\Laravel\Eloquent\Model as Eloquent;
use MongoDB\Laravel\Eloquent\SoftDeletes;

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
