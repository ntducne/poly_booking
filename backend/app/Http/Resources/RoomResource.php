<?php

namespace App\Http\Resources;

use App\Models\Branch;
use App\Models\RoomImage;
use App\Models\RoomType;
use Illuminate\Http\Resources\Json\JsonResource;

class RoomResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'area' => $this->area,
            'adults' => $this->adults,
            'children' => $this->children,
            'room_type_id' => $this->room_type_id,
            'pay_upon_check_in' => $this->pay_upon_check_in,
            'description' => $this->description,
            'discount' => $this->discount,
            'status' => $this->status,
            'policies_and_information' => $this->policies_and_information,
            'num_of_bed' => $this->num_of_bed,
            'bed_size' => $this->bed_size,
            'branch_id' => Branch::where('_id', $this->branch_id)->first(),
            'name' => $this->name,
            'images' => RoomImage::where('room_id', $this->id)->get(),
            'rate' => $this->getRate(),
            'type' => RoomType::where('_id', $this->room_type_id)->first(),
        ];
    }
}
