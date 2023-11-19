<?php

namespace App\Http\Resources;

use App\Models\Admin;
use App\Models\Booking;
use App\Models\Branch;
use App\Models\HistoryHandleBooking;
use App\Models\Services;
use Illuminate\Http\Resources\Json\JsonResource;

class BillingResource extends JsonResource
{
    function hisoryHanle(){
        $history = HistoryHandleBooking::where('booking_id', $this->id)->get();
        $data = [];
        foreach ($history as $item){
            $data[] = [
                'admin' => [
                    'name' => Admin::find($item->admin_id)->name,
                    'image' => Admin::find($item->admin_id)->image,
                ],
                'handle' => $item->handle,
                'time' => $item->time,
            ];
        }
        return $data;
    }

    function getStatus(){
        $statusArray = config('status');

        // Check if the status exists in the configuration
        if (isset($statusArray[$this->status])) {
            return $statusArray[$this->status]['status'];
        } else {
            return 'Unknown Status';
        }
    }


    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'booking' => new BookingResource(Booking::find($this->booking_id)),
            'services' => $this->services,
            'total' => $this->total,
            'payment_method' => $this->payment_method,
            'payment_date' => $this->payment_date,
            'branch' => new BranchResource(Branch::find($this->branch_id)),
            'status' => $this->status,
            'status_name' => $this->getStatus(),
            'history' => $this->hisoryHanle(),
        ];
    }
}
