<?php

use App\Modules\Client\Controllers\ClientController;
use App\Modules\Services\Controllers\ServicesController;
use Illuminate\Support\Facades\Route;

Route::fallback(function () {
    return response()->json([
        'message' => 'Page Not Found'
    ], 404);
});


Route::post('contact', [ClientController::class, 'contact']);
Route::resource('services', ServicesController::class)->except(['create', 'edit']);

Route::get('branch', [ClientController::class, 'branch']);

Route::prefix('room')->group(function () {
    Route::get('/', [ClientController::class, 'rooms']);
    Route::get('/type', [ClientController::class, 'roomType']);
    Route::get('/{slug}', [ClientController::class, 'roomDetail']);
});

Route::prefix('booking')->group(function () {
    Route::post('/', [ClientController::class, 'booking']);
    Route::post('/check', [ClientController::class, 'checkBooking']);
});

Route::prefix('v2')->group(function () {
    Route::get('/search', [ClientController::class, 'processSearch']);
    Route::post('/search', [ClientController::class, 'processSearch']);
    Route::post('/booking', [ClientController::class, 'processBooking']);
    Route::post('/renew', [ClientController::class, 'processRenew']);

});
