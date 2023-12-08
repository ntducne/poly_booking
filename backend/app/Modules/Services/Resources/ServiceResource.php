<?php

namespace App\Modules\Services\Resources;

use App\Models\Branch;
use App\Modules\Branch\Resources\BranchResource;
use Illuminate\Http\Resources\Json\JsonResource;

class ServiceResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'service_name'=> $this->service_name,
            'price'=>$this->price,
            'description'=>$this->description,
            'branch' =>Branch::find($this->branch_id) ,
        ];
    }
}
