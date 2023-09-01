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
            'room_type_id'=>'64ec0bced418b71645087d32',
            'num_of_room'=>10,
            'single_room'=>true,
            'double_room'=>false,
            'room_name'=>fake()->name()
        ];
    }
}
