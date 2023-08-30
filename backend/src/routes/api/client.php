<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ServicesController;
use Illuminate\Support\Facades\Route;
Route::get('categories', [CategoryController::class, 'index']);



//Services
Route::resource('services',ServicesController::class);
// Route::get('services',[ServicesController::class,'index']);
// Route::get('services',[ServicesController::class,'index']);
