<?php

namespace app\Http\Requests\RoomType;

use App\Http\Requests\Request;
use App\Models\RoomType;
use Illuminate\Validation\Rule;
class UpdateRoomTypeRequest extends Request
{

    public function rules()
    {
        return [
            'room_type_name' => ['bail', 'required', 'string',
                Rule::unique(RoomType::class, 'room_type_name')->ignore($this->roomtype,$this->column_id),],
            'description' => ['bail', 'required', 'string'],
            'price_per_night' => ['bail', 'required', 'numeric'],
            'status' => ['bail', 'required'],
        ];
    }
    public function attributes()
    {
        return [
            'room_type_name' => 'Tên loại phòng',
            'description' => 'Mô tả ',
            'price_per_night' => 'Giá một đêm',
            'status' => 'Trạng thái',
        ];
    }
}
