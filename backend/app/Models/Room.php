<?php

namespace App\Models;

use App\Http\Resources\RoomImageResource;
use App\Modules\RoomType\Resources\RoomTypeResource;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use MongoDB\Laravel\Eloquent\Model as Eloquent;
use MongoDB\Laravel\Eloquent\SoftDeletes;

class Room extends Eloquent
{
    use HasFactory, SoftDeletes;
    protected $fillable = [
        'area',
        'slug',
        'adults',
        'children',
        'room_type_id',
        'description',
        'description_sort',
        'discount',
        'num_of_bed',
        'bed_size',
        'branch_id',
        'name',
        'room_number',
        'amount',
        'floor',
        'pay_is_checkin'
    ];
    protected $attributes = [
        'deleted_at' => null,
    ];

    public function getType()
    {
       return new RoomTypeResource(RoomType::where('_id', $this->room_type_id)->first());
    }

    public function getImages()
    {
        return RoomImageResource::collection(RoomImage::where('room_id', $this->id)->get());

    }

    public function CalcPrice() {
        $price = 0;
        $price_per_night = RoomType::where('_id', $this->room_type_id)->first();
        $discount = $this->discount;
        if($price_per_night){
            $price_per_night = $price_per_night->price_per_night;
            if ($discount > 0) {
                if ($discount < 95) {
                    $price = $price_per_night * ($discount / 100);
                } else {
                    $price = ($price_per_night - $discount);
                }
            } else {
                $price = $price_per_night;
            }
        }
        return $price;
    }


}
