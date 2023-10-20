<?php

use App\Http\Controllers\ClientController;
use App\Http\Resources\BookingResource;
use App\Http\Resources\BranchResource;
use App\Http\Resources\RoomTypeResource;
use App\Http\Resources\UserResource;
use App\Models\BookDetail;
use Illuminate\Support\Facades\Route;

Route::resource('staffs', \App\Http\Controllers\Admin\AdminController::class)->except(['create', 'edit']);

Route::prefix('room')->group(function () {
    Route::get('/', [ClientController::class, 'rooms']);
    Route::get('/type', [ClientController::class, 'roomType']);
    Route::get('/{id}', [ClientController::class, 'roomDetail']);
    Route::post('/search', [ClientController::class, 'search']);
    Route::post('/booking', [ClientController::class, 'booking']);
});

Route::get('/demo-billing', function () {
    return response()->json(
        [
            'booking' => [
                'id' => 'sạkbfbfab1927318723',
                'user' => [
                    'id' => 'áibạibạlfsạ',
                    'name' => 'Nguyễn Đức',
                    'email' => 'duc@gmail.com',
                    'phone' => '0823565831',
                    'image' => 'https://i.pinimg.com/originals/0e/4a/0e/0e4a0e0e1b0b0b0b0b0b0b0b0b0b0b0b.jpg',
                    'address' =>' Hà Nội',
                    'status' => 0,
                ],
                'booking_date' => '2021-09-09',
                'checkin' => '2021-09-09',
                'checkout' => '2021-09-10',
                'room_type' => [
                    'id' => 'ád ánđábalkjsdnádn',
                    'room_type_name' => 'Phòng đơn',
                    'description' => 'Phòng đơn',
                    'price_per_night' => '1000000',
                ],
                'representative' => [
                    'name' => 'Nguyễn Đức',
                    'email' => '',
                    'phone' => '',
                ],
                'price_per_night' => 1231231231,
                'amount_people' => [
                    'adult' => '2',
                    'children' => '1',
                ],
                'amount_room' => 3,
                'status' => 'Đã thanh toán',
                'detail' => [
                    [
                        'id_room' => '1',
                        'name_room' => 'Room 1',
                    ],
                    [
                        'id_room' => '2',
                        'name_room' => 'Room 2',
                    ],
                ],
            ],
            'services' => [
                [
                    'name' => 'Service 1',
                    'price' => '100000',
                    'date' => '2021-09-09',
                ],
                [
                    'name' => 'Service 2',
                    'price' => '300000',
                    'date' => '2021-09-10',
                ],

            ],
            'total' => 400000,
            'payment_method' => 'Tiền mặt',
            'payment_date' => '2021-09-10',
            'branch' => [
                'id' => '1238712637812',
                'name' => 'Branch 1',
                'address' => 'Hà Nội',
                'phone' => '0823565831',
            ],
            'status' => 'Đã đặt'
        ]
    );
});
