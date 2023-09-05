<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Room>
 */
class RoomFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'name' => fake()->name(), // tên phòng
            'area' => fake()->numberBetween($min = 20, $max = 100) . 'm2', // diện tích
            'num_of_people' => true, // số người
            'room_type_id' => '64ec0bced418b71645087d32', // loại phòng
            'pay_upon_check_in' => true, // trả khi nhận phòng
            'description' => fake()->text(), // mô tả
            'discount' => fake()->numberBetween($min = 100000,$max = 300000), // giảm giá
            'status' => null, // trạng thái
            'policies_and_information' => [
                'check_in_time' => '14:00', // giờ nhận phòng
                'check_out_time' => '12:00', // giờ trả phòng
            ]
        ];
    }
}
