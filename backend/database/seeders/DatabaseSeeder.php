<?php

namespace Database\Seeders;

use App\Models\Admin;
use App\Models\Branch;
use App\Models\Rates;
use App\Models\Room;
use App\Models\RoomImage;
use App\Models\RoomType;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{

    public function __construct()
    {
    }

    public function run(): void
    {
        $this->call([
            BranchSeeder::class,
        ]);
        Admin::create([
            'name' => 'Super Admin',
            'email' => 'superadmin@gmail.com',
            'password' => bcrypt('Polydev@123'),
            'phone' => '0123456789',
            'branch_id' => 'all',
            'role' => 0,
        ]);
        User::create([
            'name' => 'User',
            'email' => 'user@gmail.com',
            'password' => bcrypt('Polydev@123'),
            'phone' => '0123456789',
            'address' => 'Hà Nội',
        ]);
        create_permision();
        RoomType::factory()->count(1)->create();
        Room::factory()->count(1)->create();
        Rates::factory()->count(1)->create();
        RoomImage::factory()->count(5)->create();
    }
}
