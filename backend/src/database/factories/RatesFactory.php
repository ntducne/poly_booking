<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Rates>
 */
class RatesFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'user_id'=>fake()->numerify('asdlasjdjweaw'),
            'content'=>fake()->realText(),
            'rate_at'=>fake()->date(),
            'images'=>fake()->image(),
            'star'=>fake()->numberBetween(1,5)
        ];
    }
}
