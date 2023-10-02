<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class PromotionFactory extends Factory
{
    public function definition()
    {
        return [
            'code'       => fake()->name,
            'start_date' => fake()->date(),
            'end_date'   => fake()->date(),
            'conditions'  => fake()->realText,
        ];
    }
}
