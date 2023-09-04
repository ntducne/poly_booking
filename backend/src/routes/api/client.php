<?php

use App\Http\Controllers\BookDetailController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ServicesController;
use App\Http\Controllers\BookingController;
use App\Http\Controllers\RatesController;
use Illuminate\Support\Facades\Route;

Route::get('categories', [CategoryController::class, 'index']);


//Quan tri 
Route::resource('services', ServicesController::class);
Route::resource('booking', BookingController::class);
Route::resource('bookdetail', BookDetailController::class);
Route::resource('rates', RatesController::class);

//Khach Hang

