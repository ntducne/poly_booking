<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RoomSeeder extends Seeder
{

    public function run()
    {
        DB::table('room')->insert( [
            'room_type_id' => '64ed71ca93b2c5201609bc2d',
            'num_of_room'  => 4,
            'single_bed'   => 'true',
            'double_bed'   => 'false',
            'room_name'    => 'ABC',
         ]);
    }
}
