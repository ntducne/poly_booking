<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Jenssegers\Mongodb\Eloquent\Model as Eloquent;
use Jenssegers\Mongodb\Eloquent\SoftDeletes;
class CancellationPolicy extends Eloquent
{
    use HasFactory , SoftDeletes;

    protected $table = 'cancellation_policy';

    protected $fillable = [
        'conditions',
        'penalty',
        'room_id',
    ];

    protected $attributes = [
        'deleted_at' => null,
    ];
}
