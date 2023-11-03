<?php

namespace App\Models;

use MongoDB\Laravel\Eloquent\Model as Eloquent;
use MongoDB\Laravel\Eloquent\SoftDeletes;

class Permission extends Eloquent
{
    protected $connection = 'mongodb';
    protected $collection = 'permissions';
    protected $fillable = [
        'name',
    ];
    protected $hidden = [
        '_id',
    ];
    public $timestamps = false;
}
