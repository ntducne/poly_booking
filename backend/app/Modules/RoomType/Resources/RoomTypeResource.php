<?php

namespace App\Modules\RoomType\Resources;

use App\Models\Branch;
use App\Modules\Branch\Resources\BranchResource;
use Illuminate\Http\Resources\Json\JsonResource;

class RoomTypeResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'room_type_name' => $this->room_type_name,
            'description' => $this->description,
            'price_per_night' => $this->price_per_night,
            'branch' => new BranchResource(Branch::find($this->branch_id)),
        ];
    }
}
