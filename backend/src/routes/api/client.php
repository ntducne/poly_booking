<?php

<<<<<<< HEAD
use app\Http\Controllers\Admin\ServicesController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\CategoryController;
=======
use App\Http\Controllers\BookDetailController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ServicesController;
use App\Http\Controllers\BookingController;
use App\Http\Controllers\RatesController;
>>>>>>> phamdung
use Illuminate\Support\Facades\Route;

Route::get('categories', [CategoryController::class, 'index']);



//Services
<<<<<<< HEAD
Route::resource('services',ServicesController::class);
Route::resource('users', UserController::class);
Route::resource('billings', \App\Http\Controllers\Admin\BillingController::class);


=======
Route::resource('services', ServicesController::class);
Route::resource('booking', BookingController::class);
Route::resource('bookdetail', BookDetailController::class);
Route::resource('rates', RatesController::class);
// Route::get('services',[ServicesController::class,'index']);
// Route::get('services',[ServicesController::class,'index']);
>>>>>>> phamdung
