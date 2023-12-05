<?php

use App\Http\Controllers\Pay\VnpayController;
use App\Modules\Pay\Controllers\MomoController;
use App\Modules\Pay\Controllers\PaypalController;
use App\Models\Billing;
use App\Models\BookDetail;
use App\Models\Booking;
use App\Models\HistoryHandleBooking;
use App\Models\Notification;
use App\Models\RateRoom;
use App\Models\Room;
use App\Models\RoomType;
use App\Models\Services;
use App\Models\User;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Route;

Route::fallback(function(){ return response()->json([ 'message' => 'Page Not Found' ], 404); });
Route::get('unauthorized', function (){ return response()->json([
    'message' => 'Unauthorized !'
], 401); });
