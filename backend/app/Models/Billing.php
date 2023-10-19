<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Jenssegers\Mongodb\Eloquent\Model as Eloquent;
use Jenssegers\Mongodb\Eloquent\SoftDeletes;

class Billing extends Eloquent
{
    use HasFactory, SoftDeletes;
    protected $table = "billings";
    protected $fillable = [
        "booking_id",
        "services",
        "total",
        "payment_method",
        "payment_date",
        "branch_id",
        "status",
    ];
    protected $attributes = [
        'status' => null, // null => chua thanh toan 
        'deleted_at' => null
    ];
}
