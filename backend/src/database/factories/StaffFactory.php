<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
class StaffFactory extends Factory
{
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
