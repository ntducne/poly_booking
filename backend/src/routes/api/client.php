<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\BookDetailController;
use App\Http\Controllers\BookingController;
use App\Http\Controllers\RatesController;
use Illuminate\Support\Facades\Route;

Route::get('categories', [CategoryController::class, 'index']);
Route::resource('rooms', \App\Http\Controllers\Admin\RoomController::class);


//Services
Route::resource('booking', BookingController::class);
Route::resource('bookdetail', BookDetailController::class);
Route::resource('rates', RatesController::class);
