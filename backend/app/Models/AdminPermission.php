<?php

namespace App\Models;

use MongoDB\Laravel\Eloquent\Model as Eloquent;
use MongoDB\Laravel\Eloquent\SoftDeletes;
use Laravel\Passport\HasApiTokens;

class AdminPermission extends Eloquent
{
    use HasApiTokens;
    protected $table = 'admin_has_permission';
    protected $fillable = [
        'id_admin',
        'id_permission',
    ];
    public $timestamps = false;
}
