<?php

namespace App\Modules\User\Requests;

use App\Http\Requests\RateRoom\Room;
use App\Http\Requests\RateRoom\User;
use App\Http\Requests\Request;
use Illuminate\Validation\Rule;

class RateStoreRequest extends Request
{
    public function rules()
    {
        return [
            'room_id'   => ['required', Rule::exists(Room::class, $this->column_id)],
            'user_id'   => ['required', Rule::exists(User::class, $this->column_id)],
            'images'    => 'required|array',
            'images.*'  => 'image|mimes:jpeg,png,jpg,gif|max:2048',
            'rate'      => 'required,numeric,gt:0,lt:5,regex:/^\d+(\.\d{1,2})?$/',
            'comment'   => 'required',
        ];
    }
}
