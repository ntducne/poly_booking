<?php

use App\Modules\Pay\Controllers\MomoController;
use App\Modules\Pay\Controllers\PaypalController;
use App\Modules\Pay\Controllers\VnpayController;
use Illuminate\Support\Facades\Route;

Route::prefix('vnpay')->as('vnpay.')->group(function(){
    Route::get('process/{order_code}/{amount}', [VnpayController::class, 'process'])->name('process');
    Route::get('callback', [VnpayController::class, 'callback'])->name('callback');
});

Route::prefix('momo')->as('momo.')->group(function(){
    Route::get('process/{order_code}/{amount}', [MomoController::class, 'process'])->name('process');
    Route::get('callback', [MomoController::class, 'callback'])->name('callback');
});

Route::prefix('paypal')->as('paypal.')->group(function(){
    Route::get('process/{order_code}/{amount}', [PaypalController::class, 'process'])->name('process');
    Route::get('cancel/{order_code}', [PaypalController::class, 'cancel'])->name('cancel');
    Route::get('success', [PaypalController::class, 'success'])->name('success');
});