<?php

use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\Admin\BillingController;
use App\Http\Controllers\Admin\BookingController;
use App\Http\Controllers\Admin\RatesController;
use App\Http\Controllers\Admin\RoomController;
use App\Http\Controllers\Admin\BranchController;
use App\Http\Controllers\Admin\CancellationPolicyController;
use App\Http\Controllers\Admin\PromotionController;
use App\Http\Controllers\Admin\RoomTypeController;
use App\Http\Controllers\Admin\ServicesController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Admin\UtilitiesController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Middleware\CheckPermission;
use Illuminate\Support\Facades\Route;

Route::fallback(function () {
    return response()->json([
        'message' => 'Page Not Found'
    ], 404);
});


Route::middleware(CheckPermission::class)->group(function () {
    Route::resource('branches', BranchController::class)->except(['create', 'edit']);

    Route::resource('rooms/types', RoomTypeController::class)->except(['create', 'edit']);

    Route::post('rooms/deleteImage', [RoomController::class, 'deleteImageRoom'])->name('rooms.image.delete');

    Route::resource('utilities', UtilitiesController::class)->except(['create','edit']);

    Route::resource('rooms', RoomController::class)->except(['create', 'edit']);

    Route::post('rooms/updateImage/{id}', [\App\Http\Controllers\Admin\RoomController::class, 'updateImage'])->name('rooms.image.update');

    Route::resource('utilities', UtilitiesController::class)->except(['create', 'edit']);

    Route::resource('users', UserController::class)->except(['create', 'edit']);

    Route::resource('staffs', AdminController::class)->except(['create', 'edit']);

    Route::post('staffs/assignPermission/{id}', [AdminController::class, 'assignPermission'])->name('staffs.assignPermission');

    Route::resource('rates', RatesController::class)->except(['create', 'edit']);

    Route::resource('policies', CancellationPolicyController::class)->except(['create', 'edit']);

    Route::resource('promotions', PromotionController::class)->except(['create', 'edit']);

    Route::resource('services', ServicesController::class)->except(['create', 'edit']);



    Route::prefix('billings')->as('billings.')->group(function () {
        Route::get('/', [BillingController::class, 'index'])->name('index');
        Route::get('/{id}', [BillingController::class, 'show'])->name('show');
        Route::prefix('customer')->as('customer.')->group(function () {
            Route::post('/', [BillingController::class, 'addCustomer'])->name('create');
            Route::post('/{id}', [BillingController::class, 'removeCustomer'])->name('delete');
        });
        Route::prefix('service')->as('service.')->group(function () {
            Route::post('/', [BillingController::class, 'addService'])->name('create');
            Route::post('/{id}', [BillingController::class, 'removeService'])->name('delete');
        });
    });

    Route::prefix('booking')->as('booking.')->group(function () {
        Route::post('/store', [BookingController::class, 'store'])->name('store');
        Route::post('/search', [BookingController::class, 'search'])->name('search');
        Route::post('/renew', [BookingController::class, 'renew'])->name('renew');
        Route::post('/end', [BookingController::class, 'end'])->name('end');
        Route::prefix('handle')->as('handle.')->group(function (){
            Route::post('/cancel', [BookingController::class, 'cancel'])->name('cancel');
            Route::post('/checkin', [BookingController::class, 'checkin'])->name('checkin');
            Route::post('/checkout', [BookingController::class, 'checkout'])->name('checkout');
            Route::post('/addPeople', [BookingController::class, 'addPeople'])->name('addService');
            Route::post('/addService', [BookingController::class, 'addService'])->name('addService');
            Route::post('/giaHan', [BookingController::class, 'giaHan'])->name('giaHan');

        });
    });

});
Route::post('/logout', [LoginController::class, 'logout']);

