<?php

namespace App\Models;

use Jenssegers\Mongodb\Eloquent\Model as Eloquent;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Jenssegers\Mongodb\Eloquent\SoftDeletes;

class Room extends Eloquent
{
    use HasFactory, SoftDeletes;
    protected $fillable = [
        'area',
        'adults',
        'children',
        'room_type_id',
        'pay_upon_check_in',
        'description',
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

    public function getRate()
    {
       return Rates::where('room_id', $this->id)->get();
    }

}
