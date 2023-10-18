<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Jenssegers\Mongodb\Eloquent\Model as Eloquent;
use Jenssegers\Mongodb\Eloquent\SoftDeletes;


class Promotion extends Eloquent
{
    use HasFactory, SoftDeletes;

    protected $table = 'promotion' ;

    protected $fillable = [
        'code',
        'start_date',
        'end_date',
        'conditions',
        'branch_id',
    ];

    protected $attributes = [
      'deleted_at' => null,
    ];
}
