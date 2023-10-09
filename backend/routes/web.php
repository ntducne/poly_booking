<?php
use Illuminate\Support\Facades\Route;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

Route::fallback(function(){ return response()->json([ 'message' => 'Page Not Found' ], 404); });
Route::get('error-message', function (){ return response()->json([
    'message' => 'Do not have permission to access this page'
], 401); });

Route::get('/ahihi', function (){
    create_permision();
});
