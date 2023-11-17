<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Branch;
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
            Branch::create($branch);
        }
    }
}
