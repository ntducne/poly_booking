<?php

use App\Http\Controllers\Pay\VnpayController;
use App\Models\Room;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Route;

Route::fallback(function(){ return response()->json([ 'message' => 'Page Not Found' ], 404); });
Route::get('unauthorized', function (){ return response()->json([
    'message' => 'Unauthorized !'
], 401); });

Route::get('', function () {
    $totalRoomBook = 0;
    foreach (Room::all() as $value) {
        $totalRoomBook += count($value->room_number);
    }
    return $totalRoomBook;
});
