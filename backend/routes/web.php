<?php

use Illuminate\Support\Facades\Route;

Route::fallback(function(){ return response()->json([ 'message' => 'Page Not Found' ], 404); });
Route::get('unauthorized', function (){ return response()->json([
    'message' => 'Unauthorized !'
], 401); })->name('unauthorized');

