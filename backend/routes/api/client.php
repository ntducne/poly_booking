<?php

use App\Http\Controllers\ClientController;
use App\Http\Controllers\DemoController;
use Illuminate\Support\Facades\Route;

Route::fallback(function () {
    return response()->json([
        'message' => 'Page Not Found'
    ], 404);
});
Route::get('branch',[ClientController::class,'branch']);
Route::prefix('room')->group(function () {
    Route::get('/', [ClientController::class, 'rooms']);
    Route::get('/type', [ClientController::class, 'roomType']);
    Route::get('/search', [ClientController::class, 'search']);
    Route::get('/{slug}', [ClientController::class, 'roomDetail']);
    Route::post('/booking', [ClientController::class, 'booking']);
    Route::post('/booking-check', [ClientController::class, 'checkBooking']);
});
Route::get('test-search',[DemoController::class,'search']);
//Route::get('test/{id}', [\App\Repositories\UserRepository::class, 'bookingHistory']);


