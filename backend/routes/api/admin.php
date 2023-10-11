<?php

use App\Http\Controllers\Admin\AdminController;
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
Route::resource('branches', BranchController::class)->except(['create','edit']);

// tiện ích phòng
Route::resource('utilities', UtilitiesController::class)->except(['create','edit']);

// người dùng
Route::resource('users', UserController::class)->except(['create','edit']);

// nhân sự
Route::resource('staffs', AdminController::class)->except(['create','edit']);
Route::post('staffs/assignPermission', [AdminController::class, 'assignPermission']);

// đánh gía
Route::resource('rates', RatesController::class)->except(['create','edit']);

// chính sách hủy
Route::resource('cancel-policies', CancellationPolicyController::class)->except(['create','edit']);

// ưu đãi
Route::resource('promotions', PromotionController::class)->except(['create','edit']);

// dịch vụ
Route::resource('services', ServicesController::class)->except(['create','edit']);

// đặt phòng + chi tiết đặt phòng
Route::resource('bookings', BookingController::class)->except(['create','edit']);

// phòng
Route::prefix('/rooms')->group(function () {
    // loại phòng
    Route::resource('types', RoomTypeController::class)->except(['create','edit']);
    // danh sách phòng
    Route::resource('', RoomController::class)->except(['create','edit']);
});
