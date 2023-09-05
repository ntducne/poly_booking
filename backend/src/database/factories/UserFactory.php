<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;

class UserFactory extends Factory
{
    public function definition(): array
    {
        return [
            'name' => $this->faker->name(),
            'email' => $this->faker->unique()->safeEmail(), // email
            'phone' => $this->faker->unique()->phoneNumber(), // phone
            'password' => Hash::make(123456), // password
            'gender' => $this->faker->numberBetween($min = 0, $max = 1), // giới tính
            'birthday' => $this->faker->date($format = 'Y-m-d', $max = 'now'), // ngày sinh
            'active' => $this->faker->numberBetween($min = 0, $max = 1), // trạng thái
            'image' => $this->faker->imageUrl($width = 640, $height = 480), // ảnh đại diện
        ];
    }
}
