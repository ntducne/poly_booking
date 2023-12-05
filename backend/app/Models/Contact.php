<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use MongoDB\Laravel\Eloquent\Model as Eloquent;


class Contact extends Eloquent
{
    use HasFactory;
    protected $fillable = [
        'name',
        'email',
        'message'
    ];
}
