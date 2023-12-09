<?php

use App\Models\Billing;
use App\Models\Booking;
use App\Models\Services;
use App\Modules\Orders\Controllers\BillingController;
use Illuminate\Support\Facades\Route;

Route::fallback(function(){ return response()->json([ 'message' => 'Page Not Found' ], 404); });
Route::get('unauthorized', function (){ return response()->json([
    'message' => 'Unauthorized !'
], 401); })->name('unauthorized');

Route::prefix('billings')->as('billings.')->group(function () {
    Route::get('/', [BillingController::class, 'index'])->name('index');
    Route::get('/{id}', [BillingController::class, 'show'])->name('show');
});