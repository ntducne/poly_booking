<?php

namespace app\Http\Requests\Utilities;

use App\Http\Requests\Request;
use App\Models\Room;
use App\Models\Utilities;
use Illuminate\Validation\Rule;

class UpdateUtilitiesRequest extends Request
{

    public function rules()
    {
        return [
            'name' => ['bail', 'required' , 'string'],
            'room_id' => ['bail', 'required',
                Rule::exists(Room::class, '_id')],
        ];
    }

    public function attributes()
    {
        return [
            'name' => 'Tên tiện ích',
            'room_id' => 'Id phòng'
        ];
    }
}
