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
            'name' => $this->name,
            'slug'=> $this->slug,
            'area' => $this->area,
            'adult' => $this->adults,
            'child' => $this->children,
            'pay_upon_check_in' => $this->pay_upon_check_in,
            'description' => $this->description,
            'discount' => $this->discount,
            'status' => $this->status,
            'policies_and_information' => $this->policies_and_information,
            'num_of_bed' => $this->num_of_bed,
            'bed_size' => $this->bed_size,
            'branch' => new BranchResource(Branch::where('_id', $this->branch_id)->first()),
            'images' => $this->getImages(),
            'rate' => $this->getRate(),
            'type' => $this->getType(),
        ];
    }
}
