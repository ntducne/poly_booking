<?php

use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\Admin\BookDetailController;
use App\Http\Controllers\Admin\BookingController;
use App\Http\Controllers\Admin\RatesController;
use App\Http\Controllers\Admin\RoomController;
use App\Http\Controllers\Admin\BranchController;
use app\Http\Controllers\Admin\CancellationPolicyController;
use app\Http\Controllers\Admin\PromotionController;
use app\Http\Controllers\Admin\RoomTypeController;
use App\Http\Controllers\Admin\ServicesController;
use App\Http\Controllers\Admin\UserController;
use app\Http\Controllers\Admin\UtilitiesController;
use Illuminate\Support\Facades\Route;

// chi nhánh
Route::resource('branches', BranchController::class);

// tiện ích phòng
Route::resource('utilities', UtilitiesController::class);

// người dùng
Route::resource('users', UserController::class);

// nhân sự
Route::resource('personnel', AdminController::class);
Route::post('personnel/assignPermission', [AdminController::class, 'assignPermission']);

// đánh gía
Route::resource('rate', RatesController::class);

// chính sách hủy
Route::resource('cancel-policies', CancellationPolicyController::class);

// ưu đãi
Route::resource('promotions', PromotionController::class);

// dịch vụ
// Route::resource('services', ServicesController::class);
Route::prefix('/services')->group(function () {

    Route::get('', [ServicesController::class, 'index']);
    Route::get('/{id}', [ServicesController::class, 'show']);
    Route::post('', [ServicesController::class, 'store']);
    Route::put('/{id}', [ServicesController::class, 'update']);
    Route::delete('/{id}', [ServicesController::class, 'delete']);
});

// đặt phòng + chi tiết đặt phòng
// Route::resource('booking', BookingController::class);
Route::prefix('/booking')->group(function () {
    Route::get('', [BookingController::class, 'index']);
    Route::get('/{id}', [BookingController::class, 'show']);
    Route::delete('/{id}', [BookingController::class, 'delete']);
    Route::get('/bookdetail', [BookDetailController::class, 'index']);
    Route::get('/bookdetail/{id}', [BookDetailController::class, 'show']);
    Route::delete('/bookdetail/{id}', [BookDetailController::class, 'delete']);
});

// phòng
Route::prefix('/rooms')->group(function () {
    // loại phòng
    Route::resource('types', RoomTypeController::class);
    // danh sách phòng
    Route::resource('', RoomController::class);
});