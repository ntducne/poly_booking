<?php

use App\Http\Controllers\Pay\VnpayController;
use Illuminate\Support\Facades\Route;

Route::fallback(function(){ return response()->json([ 'message' => 'Page Not Found' ], 404); });
Route::get('error-message', function (){ return response()->json([
    'message' => 'Hết thời gian đăng nhập !'
], 401); });


Route::get('', function () {
    return view('demo');
});
Route::post('', [VnpayController::class, 'process'])->name('vnpay.process');
