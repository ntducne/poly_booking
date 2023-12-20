<?php

namespace App\Modules\Staff\Resources;

use App\Models\Branch;
use App\Modules\Branch\Resources\BranchResource;
use Illuminate\Http\Resources\Json\JsonResource;

class StaffResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->email,
            'image' => $this->image,
            'phone' => $this->phone,
            'status' => $this->status,
            'branch' => new BranchResource(
                Branch::find($this->branch_id)
            ),
        ];
    }
}
