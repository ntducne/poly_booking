<?php


use App\Http\Controllers\Auth\AuthController;
use App\Http\Middleware\CheckPermission;
use App\Models\Notification;
use App\Modules\Branch\Controllers\BranchController;
use App\Modules\Dashboard\Controllers\DashboardController;
use App\Modules\Orders\Controllers\BillingController;
use App\Modules\Orders\Controllers\BookingController;
use App\Modules\Policy\Controllers\CancellationPolicyController;
use App\Modules\Rate\Controllers\RatesController;
use App\Modules\Room\Controllers\RoomController;
use App\Modules\RoomType\Controllers\RoomTypeController;
use App\Modules\Services\Controllers\ServicesController;
use App\Modules\Staff\Controllers\AdminController;
use App\Modules\User\Controllers\UserController;
use App\Modules\Utilities\Controllers\UtilitiesController;
use Illuminate\Support\Facades\Route;

Route::fallback(function () {
    return response()->json([
        'message' => 'Page Not Found'
    ], 404);
});

// Route::middleware(CheckPermission::class)->group(function () {

    Route::get('/notifications', function(){
        $notification = Notification::all();
        $newNotification = [];
        foreach ($notification as $key => $value) {
            $newNotification[] = [
                'message' => $value->message,
                'time' => $value->time,
            ];
        }
        return response()->json($newNotification);
    })->name('notifications');

    Route::get('/statisticals', [DashboardController::class, 'statistical'])->name('statisticals.index');

    Route::resource('branches', BranchController::class)->except(['create', 'edit']);

    Route::resource('rooms/types', RoomTypeController::class)->except(['create', 'edit']);

    Route::post('rooms/deleteImage', [RoomController::class, 'deleteImageRoom'])->name('rooms.image.delete');

    Route::resource('rooms', RoomController::class)->except(['create', 'edit']);

    Route::post('rooms/updateImage/{id}', [RoomController::class, 'updateImage'])->name('rooms.image.update');

    Route::resource('utilities', UtilitiesController::class)->except(['create', 'edit']);

    Route::resource('users', UserController::class)->except(['create', 'edit']);

    Route::resource('staffs', AdminController::class)->except(['create', 'edit']);

    Route::post('staffs/assignPermission/{id}', [AdminController::class, 'assignPermission'])->name('staffs.assignPermission');

    Route::resource('rates', RatesController::class)->except(['create', 'edit']);

    Route::resource('policies', CancellationPolicyController::class)->except(['create', 'edit']);

//    Route::resource('promotions', PromotionController::class)->except(['create', 'edit']);

    Route::resource('services', ServicesController::class)->except(['create', 'edit']);

    Route::prefix('billings')->as('billings.')->group(function () {
        Route::get('/', [BillingController::class, 'index'])->name('index');
        Route::get('/{id}', [BillingController::class, 'show'])->name('show');
    });

    Route::prefix('booking')->as('booking.')->group(function () {
        Route::post('/store', [BookingController::class, 'store'])->name('store');
        Route::get('/search', [BookingController::class, 'search'])->name('search');
        Route::prefix('handle')->as('handle.')->group(function (){
            Route::post('/cancel', [BookingController::class, 'cancel'])->name('cancel');
            Route::post('/checkin', [BookingController::class, 'checkin'])->name('checkin');
            Route::post('/checkout', [BookingController::class, 'checkout'])->name('checkout');
            Route::post('/addPeople', [BookingController::class, 'addPeople'])->name('addService');
            Route::post('/addService', [BookingController::class, 'addService'])->name('addService');
            Route::post('/giaHan', [BookingController::class, 'giaHan'])->name('giaHan');
        });
    });

    


// });
Route::post('/logout', [AuthController::class, 'logout']);

