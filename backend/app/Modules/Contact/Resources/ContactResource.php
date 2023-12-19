<?php


namespace App\Modules\Contact\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ContactResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'name' => $this->fullname,
            'email' => $this->email,
            'message' => $this->phone,
            'time' => $this->created_at,
        ];
    }
}