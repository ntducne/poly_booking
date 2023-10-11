<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class RoomTypeResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'room_type_name' => $this->name,
            'description' => $this->description,
            'price_per_night' => $this->price_per_night,
            'status' => $this->status,
        ];
    }
}
