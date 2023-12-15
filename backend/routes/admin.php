<?php


use App\Http\Controllers\Auth\AuthController;
use App\Http\Middleware\CheckPermission;
use App\Http\Middleware\CheckRoleAdmin;
use App\Http\Middleware\CheckRoleSuperAdmin;
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

Route::get('/notifications', function(){
    $notification = Notification::all();
    $newNotification = [];
    foreach ($notification as $value) {
        $newNotification[] = [
            'message' => $value->message,
            'time' => $value->time,
        ];
    }
    // đảo ngược mảng
    $newNotification = array_reverse($newNotification);
    return response()->json($newNotification);
})->name('notifications');

Route::get('/contact', function(){
    $contacts = \App\Models\Contact::all();
    $newContacts = [];
    foreach ($contacts as $value) {
        $newContacts[] = [
            'name' => $value->name,
            'email' => $value->email,
            'message' => $value->message,
            'time' => $value->created_at,
        ];
    }
    return response()->json($newContacts);
})->name('contact');

Route::middleware(CheckRoleSuperAdmin::class)->group(function () {

    Route::resource('branches', BranchController::class)->except(['create', 'edit']);

    Route::post('staffs/createAdmin', [AdminController::class, 'store']);

    Route::get('staffs/listAdmin', [AdminController::class, 'index']);

    Route::post('staffs/updateAdmin/{id}', [AdminController::class, 'update']);

    Route::post('staffs/deleteAdmin/{id}', [AdminController::class, 'destroy']);
    
    Route::post('staffs/assignPermissionAdmin/{id}', [AdminController::class, 'assignPermission']);
});

Route::get('/room/search', [BookingController::class, 'search'])->name('search');

Route::get('/statisticals', [DashboardController::class, 'statistical'])->name('statisticals.index');

Route::get('/chart', [DashboardController::class, 'chartRevenue'])->name('statisticals.chart');


Route::middleware(CheckPermission::class)->group(function () {

    Route::middleware(CheckRoleAdmin::class)->group(function () {
    
        Route::resource('staffs', AdminController::class)->except(['create', 'edit']);

        Route::post('staffs/assignPermission/{id}', [AdminController::class, 'assignPermission'])->name('staffs.assignPermission');
    
    });

    Route::resource('rooms/types', RoomTypeController::class)->except(['create', 'edit']);

    Route::post('rooms/deleteImage', [RoomController::class, 'deleteImageRoom'])->name('rooms.image.delete');

    Route::resource('rooms', RoomController::class)->except(['create', 'edit']);

    Route::post('rooms/updateImage/{id}', [RoomController::class, 'updateImage'])->name('rooms.image.update');

    Route::resource('utilities', UtilitiesController::class)->except(['create', 'edit']);

    Route::resource('users', UserController::class)->except(['create', 'edit']);

    Route::resource('rates', RatesController::class)->except(['create', 'edit', 'store']);

    Route::resource('policies', CancellationPolicyController::class)->except(['create', 'edit']);

    Route::resource('services', ServicesController::class)->except(['create', 'edit']);

    Route::prefix('billings')->as('billings.')->group(function () {
        Route::get('/', [BillingController::class, 'index'])->name('index');

        Route::get('/{id}', [BillingController::class, 'show'])->name('show');
    });

    Route::prefix('booking')->as('booking.')->group(function () {

        Route::post('/store', [BookingController::class, 'store'])->name('store');

        Route::post('/search', [BookingController::class, 'search'])->name('search');

        Route::prefix('handle')->as('handle.')->group(function (){

            Route::post('/cancel', [BookingController::class, 'cancel'])->name('cancel');

            Route::post('/checkin', [BookingController::class, 'checkin'])->name('checkin');

            Route::post('/checkout', [BookingController::class, 'checkout'])->name('checkout');

            Route::post('/addPeople', [BookingController::class, 'addPeople'])->name('addPeople');

            Route::post('/addService', [BookingController::class, 'addService'])->name('addService');

            Route::post('/giaHan', [BookingController::class, 'giaHan'])->name('giaHan');

        });

    });

});

Route::post('/logout', [AuthController::class, 'logout']);