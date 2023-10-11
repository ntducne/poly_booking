<?php

namespace Database\Factories;

use App\Models\Room;
use App\Models\User;
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
            'user_id'=>User::orDerBy('id','desc')->first()->id,
            'content'=>fake()->realText(),
            'rate_at'=>fake()->date(),
            'images'=>fake()->imageUrl(),
            'star'=>fake()->numberBetween(1,5),
            'room_id'=>Room::orDerBy('id','desc')->first()->id,
        ];
    }
}
