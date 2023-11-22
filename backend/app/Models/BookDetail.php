<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Factories\HasFactory;
use MongoDB\Laravel\Eloquent\Model as Eloquent;
use MongoDB\Laravel\Eloquent\SoftDeletes;

class BookDetail extends Eloquent
{
    use HasFactory, SoftDeletes;
    protected $table = 'book_details';
    protected $fillable = [
        'booking_id',
        'room_id',
        'room_name',
        'room_number',
        'status',
        'deleted_at'
    ];
    protected $attributes = [
        'deleted_at' => null
    ];
}
