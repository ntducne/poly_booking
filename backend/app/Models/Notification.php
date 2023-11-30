<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use MongoDB\Laravel\Eloquent\Model as Eloquent;


class Notification extends Eloquent
{
    use HasFactory;
    protected $fillable = [
        'message',
        'time',
    ];

}