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
<<<<<<< HEAD
<<<<<<< HEAD
//        RoomType::factory($this->num_seed)->create();
//        Room::factory($this->num_seed)->create();
        User::factory($this->num_seed)->create();
//        Category::factory($this->num_seed)->create();
//         Staff::factory($this->num_seed)->create();
//         Promotion::factory($this->num_seed)->create();
//         Utilities::factory($this->num_seed)->create();
//         CancellationPolicy::factory($this->num_seed)->create();
        foreach ($this->branchs as $branch) {
=======
=======
        $this->call([
            BranchSeeder::class,
        ]);
>>>>>>> bf4a1ca3958bf8433a93a8f2c4b15e65c18dbf7a
        Admin::create([
            'name' => 'Super Admin',
            'email' => 'superadmin@gmail.com',
            'password' => bcrypt('Polydev@123'),
            'phone' => '0123456789',
            'branch_id' => 'all',
            'role' => 0,
        ]);
<<<<<<< HEAD
        foreach ($this->branches as $branch) {
>>>>>>> c1432f29fcbd9bfb1fdcc7ac75235c8d701fcf2a
            Branch::create($branch);
        }
//        createPermission();
=======
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
>>>>>>> bf4a1ca3958bf8433a93a8f2c4b15e65c18dbf7a
    }
}
