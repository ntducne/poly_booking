<?php

use App\Http\Controllers\Admin\UserController;
use Illuminate\Support\Facades\Route;

Route::resource('staffs', \app\Http\Controllers\Admin\StaffController::class);
Route::resource('users', UserController::class);
