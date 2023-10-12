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
// Route::resource('services', ServicesController::class);
Route::prefix('/services')->group(function () {

    Route::get('', [ServicesController::class, 'index']);
    Route::get('/{id}', [ServicesController::class, 'show']);
    Route::post('', [ServicesController::class, 'store']);
    Route::put('/{id}', [ServicesController::class, 'update']);
    Route::delete('/{id}', [ServicesController::class, 'delete']);
});

// đặt phòng + chi tiết đặt phòng
Route::resource('booking', BookingController::class);

// phòng
Route::prefix('/rooms')->group(function () {
    // loại phòng
    Route::resource('types', RoomTypeController::class)->except(['create','edit']);
    // danh sách phòng
<<<<<<< HEAD
    Route::resource('', RoomController::class);
});
=======
    Route::resource('', RoomController::class)->except(['create','edit']);
});
>>>>>>> 10acdd4902e5bba231e88c88b00278b8f4a7dfc3
