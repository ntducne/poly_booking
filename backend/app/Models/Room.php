<?php

namespace App\Models;

use App\Http\Resources\RoomImageResource;
use App\Http\Resources\RoomTypeResource;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use MongoDB\Laravel\Eloquent\Model as Eloquent;
use MongoDB\Laravel\Eloquent\SoftDeletes;

class Room extends Eloquent
{
    use HasFactory, SoftDeletes;
    protected $fillable = [
        'area',
        'price',
        'slug',
        'adults',
        'children',
        'room_type_id',
        'pay_upon_check_in',
        'description',
        'description_sort',
        'discount',
        'status',
        'policies_and_information',
        'num_of_bed',
        'bed_size',
        'branch_id',
        'name',
    ];
    protected $attributes = [
        'deleted_at' => null,
        'status' => 0
    ];

   

    public function getType()
    {
       return new RoomTypeResource(RoomType::where('_id', $this->room_type_id)->first());
    }

    public function getImages()
    {
        return RoomImageResource::collection(RoomImage::where('room_id', $this->id)->get());

    }

}
