<?php

use App\Models\Billing;
use App\Models\BookDetail;
use App\Models\Booking;
use App\Models\Branch;
use App\Models\HistoryHandleBooking;
use App\Models\Notification;
use App\Models\RateRoom;
use App\Models\Room;
use App\Models\RoomImage;
use App\Models\RoomType;
use App\Models\Services;
use App\Modules\Dashboard\Controllers\DashboardController;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Route;

Route::fallback(function(){ return response()->json([ 'message' => 'Page Not Found' ], 404); });
Route::get('unauthorized', function (){ return response()->json([
    'message' => 'Unauthorized !'
], 401); })->name('unauthorized');

// Route::get('/', function () {
//     Billing::truncate();
//     BookDetail::truncate();
//     Booking::truncate();
//     RateRoom::truncate();
//     Branch::truncate();
//     HistoryHandleBooking::truncate();
//     DB::table('failed_jobs')->truncate();
//     Notification::truncate();
//     RoomImage::truncate();
//     RoomType::truncate();
//     Room::truncate();
//     Services::truncate();
//     DB::table('utilities')->truncate();
// });

Route::get('/chart', [DashboardController::class, 'chartRevenue'])->name('statisticals.chart');
