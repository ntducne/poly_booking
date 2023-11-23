<?php

use App\Modules\Pay\Controllers\VnpayController;
use Illuminate\Support\Facades\Route;

Route::prefix('vnpay')->group(function(){
    Route::get('process/{order_code}/{amount}', [VnpayController::class, 'process'])->name('vnpay.process');
    Route::get('callback', [VnpayController::class, 'callback'])->name('vnpay.callback');
});
