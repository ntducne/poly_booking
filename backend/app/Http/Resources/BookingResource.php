<?php

namespace App\Http\Resources;

use App\Models\BookDetail;
use App\Models\RoomType;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Resources\Json\JsonResource;

class BookingResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */

    public function getRoomType(){
        $data = RoomType::find($this->room_type);
        return [
            'id' => $data->id,
            'name' => $data->room_type_name,
            'price_per_night' => $data->price_per_night,
        ];
    }

    public function CalculatePrice(){
        $price_per_night = RoomType::find($this->room_type)->price_per_night;
        $day = Carbon::parse($this->checkin)->diffInDays(Carbon::parse($this->checkout)) + 1;
        $amount_room = $this->amount_room;
        return $price_per_night * $day * $amount_room;
    }

    function getBookDetail()
    {
        $data = BookDetail::where('booking_id', $this->id)->get();
        $room = [];
        foreach ($data as $item) {
            $room[] = [
                'room_id' => $item->room_id,
                'room_name' => $item->room_name,
            ];
        }
        return $room;
    }

    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'user' => new UserResource(User::find($this->user_id)),
            'booking_date' => $this->booking_date,
            'checkin' => $this->checkin,
            'checkout' => $this->checkout,
            'roomType' => $this->getRoomType(),
            'representative' => $this->representative,
            'provisional' => $this->CalculatePrice(),
            'amount_people' => $this->amount_people,
            'amount_room' => $this->amount_room,
            'people' => $this->people,
//            'status' => $this->status,
            'detail' => $this->getBookDetail(),
        ];
    }
}
