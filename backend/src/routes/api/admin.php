<?php

use Illuminate\Support\Facades\Route;
// use App\Http\Controllers\ServicesController;
// use App\Http\Controllers\BookingController;
// use App\Http\Controllers\RatesController;
// use App\Http\Controllers\BookDetailController;

Route::resource('staffs', \App\Http\Controllers\StaffController::class);

//Services
// Route::resource('services', ServicesController::class);
// Route::resource('bookings', BookingController::class);
// Route::resource('bookdetails', BookDetailController::class);
// Route::resource('rates', RatesController::class);

