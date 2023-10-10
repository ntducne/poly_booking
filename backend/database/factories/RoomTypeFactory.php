<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class RoomTypeFactory extends Factory
{

    public function definition()
    {
        return [
            'name' => fake()->name(),
            'description'=>fake()->text(),
            'price_per_night' => fake()->numberBetween($min = 100000,$max = 300000),
         ];
    }
}
