<?php

namespace Database\Factories;

use App\Models\Branch;
use App\Models\RoomType;
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
            'room_type_id' => RoomType::orDerBy('id', 'desc')->first()->id,
            'room_name' => fake()->name(),
            'name' => fake()->name(),
            // tên phòng
            'area' => fake()->numberBetween($min = 20, $max = 100) . 'm2',
            // diện tích
            'adults' => fake()->numberBetween($min = 1, $max = 3), // số người lớn
            'children' => fake()->numberBetween($min = 0, $max = 2),
            // số người
            // 'room_type_id' => '64ec0bced418b71645087d32', // loại phòng
            'pay_upon_check_in' => true,
            // trả khi nhận phòng
            'description' => fake()->text(),
            // mô tả
            'discount' => fake()->numberBetween($min = 100000, $max = 300000),
            // giảm giá
            // trạng thái  0:trong 1:co ng
            'policies_and_information' => [
                'check_in_time' => '14:00',
                // giờ nhận phòng
                'check_out_time' => '12:00',
                // giờ trả phòng
            ],
            'num_of_bed' => fake()->numberBetween($min = 1, $max = 3),
            'bed_size' => 2,
            'branch_id' => Branch::orDerBy('id', 'desc')->first()->id,
        ];
    }
}