<?php

namespace App\Modules\Services\Resources;

use App\Models\Branch;
use App\Modules\Branch\Resources\BranchResource;
use Illuminate\Http\Resources\Json\JsonResource;

class ServiceResource extends JsonResource
{


    public function getBranch(){
        $newBranch = [];
        foreach ($this->branch_id as $key => $value) {
            $branch = Branch::find($value);
            $newBranch[] = [
                'id' => $branch->id,
                'name' => $branch->name,
                'address' => $branch->address,
                'phone' => $branch->phone,
            ];
        }
        return $newBranch;
    }


    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'service_name'=> $this->service_name,
            'price'=>$this->price,
            'description'=>$this->description,
            'branch' => $this->getBranch(),
        ];
    }
}
