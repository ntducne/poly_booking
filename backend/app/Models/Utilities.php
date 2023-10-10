<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Jenssegers\Mongodb\Eloquent\Model as Eloquent;
use Jenssegers\Mongodb\Eloquent\SoftDeletes;
class Utilities extends Eloquent
{
    use HasFactory , SoftDeletes;

    protected $table = 'utilities';

    protected $fillable = [
        'name',
        'room_id',
    ];

    protected $attributes = [
        'deleted_at' => null,
    ];
}
