<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class UtilitiesFactory extends Factory
{
    public function definition()
    {
        return [
            'name' => fake()->text,
            'room_id' => fake()->text,
        ];
    }
}
