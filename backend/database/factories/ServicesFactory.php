<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Services>
 */
class ServicesFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
           'service_name'=>fake()->name(),
           'price'=>'1000',
           'description'=>fake()->text(),
           'branch_id'=>'64ff40fd5ffa501a07081bdb',
           'deleted_at' => null
        ];
    }
}
