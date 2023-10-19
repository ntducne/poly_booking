<?php

namespace App\Models;

use Jenssegers\Mongodb\Eloquent\Model as Eloquent;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Jenssegers\Mongodb\Eloquent\SoftDeletes;

class Booking extends Eloquent
{
    use HasFactory, SoftDeletes;
    protected $fillable = [
        'user_id',
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
