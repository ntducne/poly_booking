<?php

// use App\Http\Controllers\CategoryController;
// use App\Http\Controllers\Admin\BookDetailController;
use App\Http\Controllers\User\BookingController;
// use App\Http\Controllers\Admin\BookingController as AdminBooking;
// use App\Http\Controllers\Admin\RatesController;
use App\Http\Controllers\User\RoomController;
use App\Http\Controllers\Admin\ServicesController;
use Illuminate\Support\Facades\Route;


Route::get('categories', [CategoryController::class, 'index']);
Route::resource('services', ServicesController::class);
// Route::resource('booking', BookingController::class);
// Route::resource('bookdetail', BookDetailController::class);
// Route::resource('rates', RatesController::class);
//khach hang
Route::post('/dat-phong', [BookingController::class, 'datPhong']);
Route::post('/tim-kiem',[BookingController::class, 'timKiem']);
Route::get('/room/{id}',[RoomController::class,'room_detail']);
Route::put('/huy-phong/{id}',[BookingController::class,'huyPhong']);
