<?php

namespace App\Http\Resources;

use App\Models\BookDetail;
use App\Models\RoomType;
use App\Models\User;
use Illuminate\Http\Resources\Json\JsonResource;

class BookingResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'user' => new UserResource(User::find($this->user_id)),
            'booking_date' => $this->booking_date,
            'checkin' => $this->checkin,
            'checkout' => $this->checkout,
            'room_type' => new RoomTypeResource(RoomType::find($this->room_type_id)),
            'representative' => $this->representative,
            'price_per_night' => $this->price_per_night,
            'amount_people' => $this->amount_people,
            'amount_room' => $this->amount_room,
            'status' => $this->status,
            'detail' => BookDetail::where('booking_id', $this->id)->get(),
        ];
    }
}
