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
        'amount_people',
        'amount_room',
        'status',
        'deleted_at'
    ];
    protected $attributes = [
        'status'=>false,
        'deleted_at' => null
    ];

    public function getDetail(){
        return BookDetail::where('booking_id', $this->_id)->get();
    }

    public function user(){
        return $this->belongsTo(User::class);
    }

}
