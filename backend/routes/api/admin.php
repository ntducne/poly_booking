<?php

use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\Admin\BookDetailController;
use App\Http\Controllers\Admin\BookingController;
use App\Http\Controllers\Admin\RatesController;
use App\Http\Controllers\Admin\RoomController;
use App\Http\Controllers\Admin\BranchController;
use app\Http\Controllers\Admin\CancellationPolicyController;
use app\Http\Controllers\Admin\PromotionController;
use app\Http\Controllers\Admin\RoomTypeController;
use App\Http\Controllers\Admin\ServicesController;
use App\Http\Controllers\Admin\UserController;
use app\Http\Controllers\Admin\UtilitiesController;
use Illuminate\Support\Facades\Route;

Route::resource('branches', BranchController::class)->except(['create','edit']);

Route::resource('types-rooms', RoomTypeController::class)->except(['create','edit']);

Route::resource('rooms', RoomController::class)->except(['create','edit']);

Route::resource('utilities', UtilitiesController::class)->except(['create','edit']);

Route::resource('users', UserController::class)->except(['create','edit']);

Route::resource('staffs', AdminController::class)->except(['create','edit']);

Route::post('staffs/assignPermission', [AdminController::class, 'assignPermission'])->name('staffs.assignPermission');

Route::resource('rates', RatesController::class)->except(['create','edit']);

Route::resource('cancel-policies', CancellationPolicyController::class)->except(['create','edit']);

Route::resource('promotions', PromotionController::class)->except(['create','edit']);

Route::resource('services', PromotionController::class)->except(['create','edit']);

Route::prefix('booking')->as('booking.')->group(function(){
    Route::get('/',[BookingController::class,'index'])->name('index');
    Route::get('/{id}',[BookingController::class,'show'])->name('show');
    Route::delete('/{id}',[BookingController::class,'destroy'])->name('destroy');
});

Route::prefix('booking/detail')->as('booking-detail.')->group(function(){
    Route::get('/',[BookDetailController::class,'index'])->name('index');
    Route::get('/{id}',[BookDetailController::class,'show'])->name('show');
    Route::delete('/{id}',[BookDetailController::class,'destroy'])->name('destroy');
});