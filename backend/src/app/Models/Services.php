<?php

namespace App\Models;

use Jenssegers\Mongodb\Eloquent\Model as Eloquent;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Jenssegers\Mongodb\Eloquent\SoftDeletes;

class Services extends Eloquent
{
    use HasFactory,SoftDeletes;
    protected $fillable = [
        'service_name',
        'price',
        'description',
        'deleted_at'
    ];
    protected $attributes = [
        'deleted_at' => null
    ];
}
