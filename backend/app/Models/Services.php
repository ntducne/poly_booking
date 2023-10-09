<?php

namespace App\Models;

use Jenssegers\Mongodb\Eloquent\Model as Eloquent;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Jenssegers\Mongodb\Eloquent\SoftDeletes;

class Services extends Eloquent
{
    use HasFactory,SoftDeletes;
    protected $connection = 'mongodb';
    protected $table = 'services';
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
