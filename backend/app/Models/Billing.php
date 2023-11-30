<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use MongoDB\Laravel\Eloquent\Model as Eloquent;
use MongoDB\Laravel\Eloquent\SoftDeletes;

class Billing extends Eloquent
{
    use HasFactory;
    protected $table = "billings";
    protected $fillable = [
        'booking_id',
        'user_id',
        'services',
        'total',
        'payment_method',
        'payment_date',
        'branch_id',
        'status',
        'billingCode'
    ];
    protected $attributes = [
        'status' => null
    ];
    public function getBooking()
    {
        return Booking::where('id', $this->booking_id)->first();
    }
    public function getService()
    {
        return Services::where('id', $this->service_id)->first();
    }
}
