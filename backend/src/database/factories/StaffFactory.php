<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Staff>
 */
class StaffFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'fullname'  =>fake()->name(),
            'email'     =>fake()->unique()->safeEmail(),
            'password'  => fake()->password(),
            'phone'     => fake()->e164PhoneNumber(),
            'address'   => fake()->address(),
            'image'     => fake()->imageUrl(),
            'active'    => random_int(0,2),
        ];
    }
}
