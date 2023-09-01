<?php

use app\Http\Controllers\Admin\ServicesController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\CategoryController;
use Illuminate\Support\Facades\Route;

Route::get('categories', [CategoryController::class, 'index']);



//Services
Route::resource('services',ServicesController::class);
Route::resource('users', UserController::class);
Route::resource('billings', \App\Http\Controllers\Admin\BillingController::class);


