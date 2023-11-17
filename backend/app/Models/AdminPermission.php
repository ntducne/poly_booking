<?php

namespace App\Models;

use MongoDB\Laravel\Eloquent\Model as Eloquent;
use MongoDB\Laravel\Eloquent\SoftDeletes;
use Laravel\Passport\HasApiTokens;

class AdminPermission extends Eloquent
{
    use HasApiTokens;
    protected $table = 'admin_has_permissions';
    protected $fillable = [
        'id_admin',
        'id_permission',
    ];
    public $timestamps = false;
}
