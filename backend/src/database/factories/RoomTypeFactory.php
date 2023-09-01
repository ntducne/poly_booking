<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class RoomTypeFactory extends Factory
{

    public function definition()
    {
        return [
            'room_type_name'  => fake()->name(),
            'description'     => fake()->realText,
            'price_per_night' => fake()->randomFloat(),
            'status'          => random_int(0,1)
        ];
    }
}
