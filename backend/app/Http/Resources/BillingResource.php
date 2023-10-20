<?php

namespace App\Http\Resources;

use App\Models\Services;
use Illuminate\Http\Resources\Json\JsonResource;

class BillingResource extends JsonResource
{
    private function getService(){
        $arrService = [];
        foreach ($this->sevice as $item){
            $arrService[] = [
                'name' => Services::find($item->service_name),
                'price' => Services::find($item->price),
            ];

        }
    }

    public function toArray($request)
    {
        return [
            'booking'=> new BookingResource($this->booking_id),
            'services'=>$this->services,
            'total'=>$this->total,
            'payment_method'=> $this->payment_method,
            'payment_date'=>$this->payment_date,
            'branch'=> new BranchResource($this->branch_id),
            'status'=> $this->status
        ];
    }
}
