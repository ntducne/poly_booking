<?php

use Illuminate\Support\Facades\Route;
Route::fallback(function(){ return response()->json([ 'message' => 'Page Not Found' ], 404); });
Route::get('error-message', function (){ return response()->json('Denied',403); });


Route::prefix('/permission')->group(function(){
    Route::get('/', function () {
        $permissions = config('permissions');
        $configPermission = config('configPermission');
        $result = [];
        foreach ($configPermission as $item) {
            $name = $item['name'];
            $item['permissions'] = [];
            foreach ($permissions as $key => $value) {
                if (strpos($key, "admin.$name.") === 0) {
                    // $item['permissions'][$key] = $value;
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