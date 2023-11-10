<?php

use App\Http\Controllers\ClientController;
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
    Route::get('/{id}', [ClientController::class, 'roomDetail']);
    Route::post('/booking', [ClientController::class, 'booking']);
});


Route::get('test/{id}', [\App\Repositories\UserRepository::class, 'bookingHistory']);


