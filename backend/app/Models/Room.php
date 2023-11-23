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
        'floor'
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

}
