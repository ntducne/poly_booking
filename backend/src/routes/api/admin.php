<?php

use App\Http\Controllers\CancellationPolicyController;
use App\Http\Controllers\PromotionController;
use App\Http\Controllers\UtilitiesController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\RoomTypeController;
use App\Http\Controllers\StaffController;

Route::resource('staffs', StaffController::class);
Route::resource('roomtypes',RoomTypeController::class);
Route::resource('promotions', PromotionController::class);
Route::resource('utilities', UtilitiesController::class);
Route::resource('cancelpolicies', CancellationPolicyController::class);


