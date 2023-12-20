<?php

namespace App\Http\Resources;

use App\Models\Room;
use App\Models\User;
use App\Modules\Room\Resources\RoomResource;
use App\Modules\User\Resources\UserResource;
use Illuminate\Http\Resources\Json\JsonResource;

class RateResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return
        [
            'id' => $this->id,
            'user' => new UserResource(User::find($this->user_id)),
            'content'=>$this->comment,
            'rate_at'=>$this->time,
            'images'=>$this->images,
            'star'=> $this->rate,
            'room' => new RoomResource(Room::find($this->room_id)),
        ];
    }
}
