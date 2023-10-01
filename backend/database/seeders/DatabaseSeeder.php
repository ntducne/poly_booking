<?php

namespace Database\Seeders;

use App\Models\CancellationPolicy;
use App\Models\Category;
use App\Models\Promotion;
use App\Models\RoomType;
use App\Models\Staff;
use App\Models\User;
use App\Models\Utilities;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Branch;
use App\Models\Room;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    private int $num_seed;
    /**
     * @var array|array[]
     */
    private array $branchs;

    public function __construct()
    {
        $this->num_seed = 5;
        $this->branchs = [
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
    }

    public function run(): void
    {
//        RoomType::factory($this->num_seed)->create();
//        Room::factory($this->num_seed)->create();
//        User::factory($this->num_seed)->create();
//        Category::factory($this->num_seed)->create();
//         Staff::factory($this->num_seed)->create();
//         Promotion::factory($this->num_seed)->create();
//         Utilities::factory($this->num_seed)->create();
//         CancellationPolicy::factory($this->num_seed)->create();
        foreach ($this->branchs as $branch) {
            Branch::create($branch);
        }
    }
}
