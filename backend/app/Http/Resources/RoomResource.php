<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class RoomResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'area' => $this->area,
            'num_of_people' => $this->num_of_people,
            'room_type_id' => $this->room_type_id,
            'pay_upon_check_in' => $this->pay_upon_check_in,
            'description' => $this->description,
            'discount' => $this->discount,
            'status' => $this->status,
            'policies_and_information' => $this->policies_and_information,
            'num_of_bed' => $this->num_of_bed,
            'bed_size' => $this->bed_size,
            'branch_id' => $this->branch_id,
            'name' => $this->name,
            'images' => $this->images,
        ];
    }
}
