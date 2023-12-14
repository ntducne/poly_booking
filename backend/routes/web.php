<?php

use App\Models\Billing;
use App\Models\BookDetail;
use App\Models\Booking;
use App\Models\RateRoom;
use Illuminate\Support\Facades\Route;

Route::fallback(function(){ return response()->json([ 'message' => 'Page Not Found' ], 404); });
Route::get('unauthorized', function (){ return response()->json([
    'message' => 'Unauthorized !'
], 401); })->name('unauthorized');

Route::get('/', function () {
    Billing::truncate();
    BookDetail::truncate();
    Booking::truncate();
    RateRoom::truncate();
});