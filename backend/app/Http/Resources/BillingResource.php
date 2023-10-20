<?php

namespace App\Http\Resources;

use App\Models\Booking;
use App\Models\Branch;
use App\Models\Services;
use Illuminate\Http\Resources\Json\JsonResource;

class BillingResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id'=>$this->id,
            'booking'=> new BookingResource(Booking::find($this->booking_id)),
            'services'=>$this->services,
            'total'=>$this->total,
            'payment_method'=> $this->payment_method,
            'payment_date'=>$this->payment_date,
            'branch'=> new BranchResource(Branch::find($this->branch_id)),
            'status'=> $this->status
        ];
    }
}
