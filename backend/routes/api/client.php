<?php

use App\Http\Controllers\ClientController;
use Illuminate\Support\Facades\Route;

Route::resource('staffs', \App\Http\Controllers\Admin\AdminController::class)->except(['create','edit']);

Route::prefix('room')->group(function (){
    Route::get('/', [ClientController::class, 'rooms']);
    Route::get('/type', [ClientController::class, 'roomType']);
    Route::get('/{id}', [ClientController::class, 'roomDetail']);
    Route::get('/search', [ClientController::class, 'search']);
    Route::post('/booking', [ClientController::class, 'booking']);
});
