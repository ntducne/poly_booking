<?php

use Illuminate\Support\Facades\Route;
Route::fallback(function(){ return response()->json([ 'message' => 'Page Not Found' ], 404); });
Route::get('error-message', function (){ return response()->json('Denied',403); });


Route::prefix('/permission')->group(function(){
    Route::get('/list', function(){
    $routeCollection = Route::getRoutes();
    $dataPermissions = [];
    foreach ($routeCollection as $route) {
        if($route->getName() != null){
            if (str_contains($route->getName(), 'admin.')) {
                $parts = explode('.', $route->getName());
                if (count($parts) >= 3) {
                    $arr_item = [
                        $route->getName() => ucfirst($parts[1]) .' '. ucfirst($parts[2])
                    ];
                    $dataPermissions = array_merge($dataPermissions, $arr_item);
                }
            }
        }
    }
    return response()->json($dataPermissions);
    });
    Route::get('/', function () {
        $permissions = config('permissions');
        $configPermission = config('configPermission');
        $result = [];
        foreach ($configPermission as $item) {
            $name = $item['name'];
            $item['permissions'] = [];
            foreach ($permissions as $key => $value) {
                if (strpos($key, "admin.$name.") === 0) {
                    $item['permissions'][] = [$key => $value];
                }
            }
            $result[] = $item;
        }
        return response()->json($result);
    });
    Route::get('/reload', function (){
        create_permision();
    });
});
