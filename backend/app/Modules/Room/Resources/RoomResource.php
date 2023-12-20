<?php

namespace App\Modules\Room\Resources;

use App\Models\Branch;
use App\Models\RateRoom;
use App\Models\RoomType;
use App\Models\User;
use App\Models\Utilities;
use App\Modules\Branch\Resources\BranchResource;
use Illuminate\Http\Resources\Json\JsonResource;

class RoomResource extends JsonResource
{
    public function getRate()
    {
        $arr = [];
        $rates = RateRoom::where('room_id', $this->id)->get();
        foreach ($rates as $rate) {
            $arr[] = [
                'user' => [
                    'name' => User::where('_id', $rate->user_id)->first()->name,
                    'image' => User::where('_id', $rate->user_id)->first()->image,
                ],
                'content' => $rate->comment,
                'star' => $rate->rate,
                'time'=> $rate->time,
                'image' => $rate->images
            ];
        }
        // reverse array
        return array_reverse($arr);
        
        // return $arr;
        
    }

    public function getUtilities(){
        $arr = [];
        $utilities = Utilities::where('branch_id', $this->branch_id)->get();
        foreach ($utilities as $utility) {
            // filter id in $utlities array room_id
            if(in_array($this->id, $utility->room_id)){
                $arr[] = [
                    'name' => $utility->name,
                ];
            }
        }
        return $arr;
    }

    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'slug'=> $this->slug,
            'area' => $this->area,
            'adults' => $this->adults,
            'children' => $this->children,
            'price' => $this->CalcPrice(),
            'pay_is_checkin' => $this->pay_is_checkin,
            'description' => $this->description,
            'discount' => $this->discount,
            // 'status' => $this->status,
            // 'policies_and_information' => $this->policies_and_information,
            'num_of_bed' => $this->num_of_bed,
            // 'bed_size' => $this->bed_size,
            'branch' => new BranchResource(Branch::find($this->branch_id)->first()),
            'images' => $this->getImages(),
            'rate' => $this->getRate(),
            'type' => $this->getType(),
            'utilities' => $this->getUtilities(),
        ];
    }
}
