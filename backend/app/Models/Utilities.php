<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use MongoDB\Laravel\Eloquent\Model as Eloquent;
use MongoDB\Laravel\Eloquent\SoftDeletes;
class Utilities extends Eloquent
{
    use HasFactory , SoftDeletes;

    protected $table = 'utilities';

    protected $fillable = [
        'name',
        'branch_id',
        'room_id',
    ];

    protected $attributes = [
        'deleted_at' => null,
    ];
}
