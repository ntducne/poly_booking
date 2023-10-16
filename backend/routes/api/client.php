<?php

use App\Http\Controllers\Admin\ServicesController;
use App\Http\Controllers\ClientController;
use Illuminate\Support\Facades\Route;
Route::prefix('room')->group(function (){
    Route::get('/', [ClientController::class, 'rooms']);
    Route::get('/type', [ClientController::class, 'roomType']);
    Route::get('/{id}', [ClientController::class, 'roomDetail']);
    Route::post('/search', [ClientController::class, 'search']);
    Route::post('/booking', [ClientController::class, 'booking']);
});
Route::resource('services', ServicesController::class)->except(['create','edit']);

