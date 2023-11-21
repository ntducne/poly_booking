<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Billing;
use App\Models\BookDetail;
use App\Models\Booking;
use App\Models\Branch;
use App\Models\Room;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $branches = [
            [
                'name' => 'PolyDev Hotel Quang Ninh',
                'address' => 'Quang Ninh',
                'phone' => '0123456789'
            ],
            [
                'name' => 'PolyDev Hotel Ha Noi',
                'address' => 'Ha Noi',
                'phone' => '0123456789'
            ],
            [
                'name' => 'PolyDev Hotel Hai Phong',
                'address' => 'Hai Phong',
                'phone' => '0123456789'
            ],
            [
                'name' => 'PolyDev Hotel Da Nang',
                'address' => 'Da Nang',
                'phone' => '0123456789'
            ],
            [
                'name' => 'PolyDev Hotel Ho Chi Minh',
                'address' => 'Ho Chi Minh',
                'phone' => '0123456789'
            ],
            [
                'name' => 'PolyDev Hotel Can Tho',
                'address' => 'Can Tho',
                'phone' => '0123456789'
            ],
            [
                'name' => 'PolyDev Hotel Nha Trang',
                'address' => 'Nha Trang',
                'phone' => '0123456789'
            ],
            [
                'name' => 'PolyDev Hotel Da Lat',
                'address' => 'Da Lat',
                'phone' => '0123456789'
            ],
            [
                'name' => 'PolyDev Hotel Vung Tau',
                'address' => 'Vung Tau',
                'phone' => '0123456789'
            ],
            [
                'name' => 'PolyDev Hotel Phu Quoc',
                'address' => 'Phu Quoc',
                'phone' => '0123456789'
            ]
        ];

        foreach ($branches as $branch) {
//            Branch::create($branch);
        }

        Room::create([
            'area' => 20,
            'slug' => 'deluxe-double',
            'adults' => 2,
            'children' => 2,
            'room_type_id' => '655c4495cfe0b8f6b9ca291d',
            'description' => 'Phòng đôi',
            'description_sort' => 'Phòng đôi',
            'discount' => 0,
            'num_of_bed' => 2,
            'bed_size' => '2m',
            'branch_id' => '6556c8b69d55ac02470ae3eb',
            'name' => 'Deluxe Double',
            'room_number' => [
                101,
                102,
                103,
                104,
                105,
                106,
                107,
                108,
                109,
                110,
            ],
            'amount' => 10,
            'floor' => 1
        ]);
        Booking::create([
            'booking_date' => '2023-12-05',
            'checkin' => '2023-12-10',
            'checkout' => '2023-12-15',
            'room_type' => '655c4495cfe0b8f6b9ca291d',
            'representative' => [
                'name' => 'Nguyen Van A',
                'phone' => '0123456789',
                'email' => 'aaaaaa@gmail.com',
            ],
            'price_per_night' => 1000000,
            'amount_people' => [
                'adult' => 2,
                'children' => 1,
            ],
            'amount_room' => 10,
            'people' => [],
            'time' => [
                'user_checkin' => '2023-12-10 14:00:00',
                'user_checkout' => '2023-12-15 12:00:00',
            ],
        ]);
        BookDetail::create([
            'booking_id' => Booking::where('booking_date', '2023-12-05')->first()->_id,
            'room_id' => Room::where('room_number', 101)->first()->_id,
            'room_name' => Room::where('room_number', 101)->first()->name,
            'room_number' => 101,
        ]);
        Billing::create([
            'booking_id' => Booking::where('booking_date', '2023-12-05')->first()->_id,
            'user_id' => '6559e09e3a847cc3610c5e35',
            'services' => [],
            'total' => 1000000,
            'payment_method' => 'cash',
            'payment_date' => '2023-12-05 14:00:00',
            'branch_id' => '6556c8b69d55ac02470ae3eb',
            'status' => 1,
            'billingCode' => '20210601',
        ]);

    }
}
