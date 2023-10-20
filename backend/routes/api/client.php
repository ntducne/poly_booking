<?php

use App\Http\Controllers\Admin\BillingController;
use App\Http\Controllers\ClientController;
use Illuminate\Support\Facades\Route;

Route::resource('staffs', \App\Http\Controllers\Admin\AdminController::class)->except(['create','edit']);

Route::prefix('room')->group(function (){
    Route::get('/', [ClientController::class, 'rooms']);
    Route::get('/type', [ClientController::class, 'roomType']);
    Route::get('/{id}', [ClientController::class, 'roomDetail']);
    Route::post('/search', [ClientController::class, 'search']);
    Route::post('/booking', [ClientController::class, 'booking']);
});

Route::prefix('bill')->group(function (){
    Route::get('/', [BillingController::class, 'index']);
    route::get('/{id}', [BillingController::class,'store']);
    Route::post('/order-services', [BillingController::class,'order_service_user']);
});