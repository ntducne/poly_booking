<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use MongoDB\Laravel\Eloquent\Model as Eloquent;
use MongoDB\Laravel\Eloquent\SoftDeletes;


class PasswordReset extends Eloquent
{
    use HasFactory;
    protected $connection = 'mongodb';
    protected $collection = 'password_resets';
    protected $fillable = [
        'email',
        'token',
        'exp',
    ];
}
