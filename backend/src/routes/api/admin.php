<?php

use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\Admin\RoomController;
use App\Http\Controllers\Admin\BranchController;
use app\Http\Controllers\Admin\CancellationPolicyController;
use app\Http\Controllers\Admin\PromotionController;
use app\Http\Controllers\Admin\RoomTypeController;
use App\Http\Controllers\Admin\UserController;
use app\Http\Controllers\Admin\UtilitiesController;
use Illuminate\Support\Facades\Route;

Route::resource('admins', AdminController::class);
Route::resource('roomtypes', RoomTypeController::class);
Route::resource('rooms', RoomController::class);
Route::resource('promotions', PromotionController::class);
Route::resource('utilities', UtilitiesController::class);
Route::resource('cancelpolicies', CancellationPolicyController::class);
Route::resource('branches', BranchController::class);



//Route::resource('staffs', \app\Http\Controllers\Admin\StaffController::class);
Route::resource('users', UserController::class);
