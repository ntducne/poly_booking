<?php

use App\Http\Controllers\Admin\UserController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\RatesController;
use App\Http\Controllers\Admin\BookDetailController;
use App\Http\Controllers\Admin\BookingController;


Route::resource('staffs', \App\Http\Controllers\StaffController::class);
// Quan Tri
// Route::resource('services', ServicesController::class);
// Route::resource('booking', BookingController::class);
// Route::resource('bookdetail', BookDetailController::class);
// Route::resource('rates', RatesController::class);
