<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use MongoDB\Laravel\Eloquent\Model as Eloquent;
use MongoDB\Laravel\Eloquent\SoftDeletes;

class Services extends Eloquent
{
    use HasFactory,SoftDeletes;
    protected $fillable = [
        'service_name',
        'price',
        'description',
        'branch_id',
        'deleted_at'
    ];
    protected $attributes = [
        'deleted_at' => null
    ];
}
