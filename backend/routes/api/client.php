<?php

use App\Http\Controllers\Admin\BillingController;
use App\Http\Controllers\ClientController;
use Illuminate\Support\Facades\Route;

<<<<<<< HEAD

Route::prefix('room')->group(function (){
=======
Route::fallback(function () {
    return response()->json([
        'message' => 'Page Not Found'
    ], 404);
});
Route::get('type', [\App\Http\Controllers\Admin\RoomTypeController::class,'index']);
Route::get('branch', [\App\Http\Controllers\Admin\BranchController::class,'index']);
Route::prefix('room')->group(function () {
>>>>>>> 633473358f6f515991122fda88ef6d201a2f59ab
    Route::get('/', [ClientController::class, 'rooms']);
    Route::get('/type', [ClientController::class, 'roomType']);
    Route::get('/search', [ClientController::class, 'search']);
    Route::get('/{id}', [ClientController::class, 'roomDetail']);
    Route::post('/booking', [ClientController::class, 'booking']);
});

