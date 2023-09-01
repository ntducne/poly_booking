<?php

namespace app\Http\Requests\CancellationPolicy;

use App\Http\Requests\Request;
use App\Models\CancellationPolicy;
use App\Models\Room;
use Illuminate\Validation\Rule;
class UpdateCancellationPolicyRequest extends Request
{

    public function rules()
    {
        return [
            'conditions' => ['bail','required','string'],
            'penalty'    => ['bail', 'required', 'string'],
            'room_id'    => ['bail', 'required',
                Rule::exists(Room::class, '_id'),
                Rule::unique(CancellationPolicy::class,'room_id')->ignore($this->table, $this->column_id)
            ]
        ];
    }

    public function attributes()
    {
        return  [
            'conditions' => 'Điều kiện',
            'penalty'    => 'Hình phạt',
            'room_id'    => 'Id phòng '
        ];
    }
}
