<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ServicesController;
use Illuminate\Support\Facades\Route;
Route::get('categories', [CategoryController::class, 'index']);

Route::resource('rooms', \App\Http\Controllers\RoomController::class);



//Services
Route::resource('services',ServicesController::class);
// Route::get('services',[ServicesController::class,'index']);
// Route::get('services',[ServicesController::class,'index']);
