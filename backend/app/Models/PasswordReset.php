<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use MongoDB\Laravel\Eloquent\Model as Eloquent;
use MongoDB\Laravel\Eloquent\SoftDeletes;


class PasswordReset extends Model
{
    use HasFactory;
    protected $fillable = [
        'email',
        'token',
        'exp',
    ];
}
