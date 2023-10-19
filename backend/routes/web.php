<?php
use Illuminate\Support\Facades\Route;

Route::fallback(function(){ return response()->json([ 'message' => 'Page Not Found' ], 404); });
Route::get('error-message', function (){ return response()->json([
    'message' => 'Hết thời gian đăng nhập !'
], 401); });


