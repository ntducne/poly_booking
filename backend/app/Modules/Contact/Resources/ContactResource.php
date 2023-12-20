<?php


namespace App\Modules\Contact\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ContactResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'name' => $this->name,
            'email' => $this->email,
            'message' => $this->message,
            'time' => $this->time,
        ];
    }
}