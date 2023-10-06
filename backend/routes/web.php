<?php
use Illuminate\Support\Facades\Route;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

Route::fallback(function(){ return response()->json([ 'message' => 'Page Not Found' ], 404); });
Route::get('error-message', function (){ return response()->json([
    'message' => 'Do not have permission to access this page'
], 401); });
Route::get('/routes', function () {
    $dataPermissions = getNameRoute();
    $guard = 'admin';
    $permission = Permission::all();

    foreach ($dataPermissions as $key => $value) {
        Permission::query()->updateOrCreate([
            'name' => $key,
            'guard_name' => $guard
        ]);
    }

    foreach ($permission as $value) {
        if (!array_key_exists($value->name, $dataPermissions)) {
            $value->delete();
        }
    }

    Role::updateOrCreate([
        'name' => 'super-admin',
        'guard_name' => $guard
    ])->givePermissionTo($permission);
    echo 'done';
});

Route::get('/routes-del', function () {
    $all = Permission::all();
    foreach ($all as $key => $value) {
        $value->delete();
    }
    $all2 = Role::all();
    foreach ($all2 as $key => $value) {
        $value->delete();
    }
});
