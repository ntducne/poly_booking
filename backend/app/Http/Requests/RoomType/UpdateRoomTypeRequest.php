<?php

namespace App\Http\Requests\RoomType;

use App\Http\Requests\Request;
use App\Models\RoomType;
use Illuminate\Validation\Rule;
class UpdateRoomTypeRequest extends Request
{
    public function rules(): array
    {
        dd($this->type);
        return [
            'room_type_name' => ['bail', 'required', 'string', Rule::unique(RoomType::class)->ignore($this->rooms_types, $this->column_id)],
            'description' => ['bail', 'required', 'string'],
            'price_per_night' => ['bail', 'required', 'numeric'],
            'status' => ['bail', 'required'],
        ];
    }
    public function attributes(): array
    {
        return [
            'room_type_name' => 'Tên loại phòng',
            'description' => 'Mô tả ',
            'price_per_night' => 'Giá một đêm',
            'status' => 'Trạng thái',
        ];
    }
}
