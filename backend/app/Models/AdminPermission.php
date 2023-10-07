<?php

namespace App\Models;

use Jenssegers\Mongodb\Eloquent\Model as Eloquent;
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
