<?php

namespace App\Modules\Staff\Resources;

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
            'branch_id' => $this->branch_id,
//            'staff_permission' => $this->getAllPermission(),
        ];
    }
}
