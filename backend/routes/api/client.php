<?php

use App\Http\Controllers\ClientController;
use Illuminate\Support\Facades\Route;

Route::prefix('room')->group(function (){
    Route::get('/search', [ClientController::class, 'search']);
    Route::post('/booking', [ClientController::class, 'booking']);
    Route::get('/{id}', [ClientController::class, 'roomDetail']);
});
