<?php

use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

// profile
Route::get('profile', [UserController::class, 'profile']);

// update
Route::prefix('update')->group(function () {
    // update avatar
    Route::post('avatar', [UserController::class, 'updateAvatar']);
    // update profile
    Route::post('profile', [UserController::class, 'updateProfile']);
    // change password
    Route::post('password', [UserController::class, 'changePassword']);
});

// booking
Route::prefix('booking')->group(function () {
    // booking
    Route::post('', [UserController::class, 'booking']);
    // booking history
    Route::get('history', [UserController::class, 'bookingHistory']);
    // booking detail
    Route::get('detail/{id}', [UserController::class, 'bookingDetail']);
    // cancel booking
    Route::post('cancel', [UserController::class, 'cancelBooking']);
});

// rate
Route::post('rate', [UserController::class, 'rate']);
