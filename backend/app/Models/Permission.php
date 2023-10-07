<?php

namespace App\Models;

use Jenssegers\Mongodb\Eloquent\Model as Eloquent;

class Permission extends Eloquent
{
    protected $connection = 'mongodb';
    protected $collection = 'permissions';
    protected $fillable = [
        'name',
    ];
    public $timestamps = false;
}
