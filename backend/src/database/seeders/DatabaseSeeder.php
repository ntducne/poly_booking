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
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    public function run()
    {
         Category::factory(5)->create();
         Staff::factory(5)->create();
         RoomType::factory(5)->create();
         Promotion::factory(5)->create();
         Utilities::factory(5)->create();
         CancellationPolicy::factory(5)->create();
         $this->call([
            RoomSeeder::class,
         ]);
    }
}
