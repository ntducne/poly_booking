<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class CreatePermission extends Command
{

    protected $signature = 'app:create-permission';

    protected $description = 'Create Permission';


    public function handle(): void
    {
        $dataPermissions = getNameRoute();
        foreach ($dataPermissions as $key => $value) {
            Permission::query()->updateOrCreate([
                'name' => $key,
                'guard_name' => 'admin'
            ]);
        };
        Permission::query()
            ->whereNotIn('name', array_keys($dataPermissions))
            ->whereNotIn('guard_name', 'admin')
            ->delete();
        $role = Role::updateOrCreate([
            'name' => 'super-admin',
            'guard_name' => 'admin'
        ]);
        $role->givePermissionTo(Permission::all());
    }
}
