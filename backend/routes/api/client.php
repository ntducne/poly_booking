<?php

use App\Http\Controllers\ClientController;
use Illuminate\Support\Facades\Route;

Route::fallback(function () {
    return response()->json([
        'message' => 'Page Not Found'
    ], 404);
});
Route::get('branch', [\App\Http\Controllers\Admin\BranchController::class,'index']);
Route::prefix('room')->group(function () {
    Route::get('/', [ClientController::class, 'rooms']);
    Route::get('/type', [ClientController::class, 'roomType']);
    Route::get('/{id}', [ClientController::class, 'roomDetail']);
    Route::post('/search', [ClientController::class, 'search']);
    Route::post('/booking', [ClientController::class, 'booking']);
});
