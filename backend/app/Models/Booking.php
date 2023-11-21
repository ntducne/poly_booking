<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use MongoDB\Laravel\Eloquent\Model as Eloquent;
use MongoDB\Laravel\Eloquent\SoftDeletes;

class Booking extends Eloquent
{
    use HasFactory, SoftDeletes;
    protected $fillable = [
        'booking_date',
        'checkin',
        'checkout',
        'room_type',
        'representative',
        'price_per_night',
        'provisional',
        'amount_people',
        'amount_room',
        'status',
        'people',
        'deleted_at',
        'time',
    ];
    protected $attributes = [
        'status' => false,
        'deleted_at' => null,
        'people' => null
    ];

    public function getDetail(){
        return BookDetail::where('booking_id', $this->_id)->get();
    }

    public function user(){
        return $this->belongsTo(User::class);
    }

}
