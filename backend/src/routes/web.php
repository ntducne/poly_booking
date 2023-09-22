<?php
use Illuminate\Support\Facades\Route;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

Route::fallback(function(){ return response()->json([ 'message' => 'Page Not Found' ], 404); });
Route::get('error-message', function (){ return response()->json('Denied',403); });
Route::get('/routes', function () {
    $dataPermissions = getNameRoute();
    $guard = 'admin';
    foreach ($dataPermissions as $key => $value) {
        Permission::query()->updateOrCreate([
            'name' => $key,
            'guard_name' => $guard
        ]);
    };
    Permission::query()
        ->whereNotIn('name', array_keys($dataPermissions))
        ->whereNotIn('guard_name', $guard)
        ->delete();
    $role = Role::updateOrCreate([
        'name' => 'super-admin',
        'guard_name' => $guard
    ]);
    $role->givePermissionTo(Permission::all());
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
