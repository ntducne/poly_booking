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
        'deleted_at'
    ];
    protected $attributes = [
        'deleted_at' => null
    ];
}
