<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use MongoDB\Laravel\Eloquent\Model as Eloquent;
use MongoDB\Laravel\Eloquent\SoftDeletes;

class CancellationPolicy extends Eloquent
{
    use HasFactory , SoftDeletes;

    protected $table = 'cancellation_policy';

    protected $fillable = [
        'conditions',
        'penalty',
        'branch_id',
        'room_id',
    ];

    protected $attributes = [
        'deleted_at' => null,
    ];
}
