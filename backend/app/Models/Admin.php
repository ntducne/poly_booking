<?php

namespace App\Models;

use Illuminate\Auth\Authenticatable;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticateContract;
use Illuminate\Notifications\Notifiable;
use Laravel\Passport\HasApiTokens;
use MongoDB\Laravel\Eloquent\Model as Eloquent;
use MongoDB\Laravel\Eloquent\SoftDeletes;

class Admin extends Eloquent implements AuthenticateContract
{
    use Authenticatable, HasApiTokens, Notifiable, SoftDeletes;
    protected $fillable = [
        'image',
        'name',
        'email',
        'password',
        'phone',
        'status',
        'branch_id',
        'role',
        'created_by'
    ];
    protected $hidden = [
        'password', 'role', 'created_by'
    ];
    protected $attributes = [
        'status'  => 0,
        'image'   => 'https://res.cloudinary.com/dteefej4w/image/upload/v1681474078/users/585e4bf3cb11b227491c339a_gtyczj.png',
        'phone'   => '',
        'address' => '',
    ];
    public function getAllPermission(): array
    {
        $adminPermission = AdminPermission::where('id_admin', $this->id)->get();
        $arr = [];
        foreach ($adminPermission as $item) {
            $permission = Permission::find($item->id_permission);
            if($permission !== null) {
                $arr[] = $permission->name;
            }
        }
        return $arr;
    }
    public function syncPermission(array $permission)
    {
        foreach ($permission as $item) {
            $permission = Permission::query()->where('name', $item)->first();
            if($permission) {
                AdminPermission::query()->updateOrCreate([
                    'id_admin'      => $this->id,
                    'id_permission' => $permission,
                ]);
            }
        }
    }
}
