<?php

namespace App\Modules\Room\Requests;

use App\Http\Requests\Request;
use Illuminate\Validation\Rule;
use App\Models\Branch;
use App\Models\RoomType;
use App\Models\Room;

class StoreRoomRequest extends Request
{
    public function rules()
    {
        return [
            'area' => ['required', 'numeric', 'min:0'],
            'adults' => ['required', 'numeric', 'min:0'],
            // 'price' => ['required', 'numeric', 'min:0'],
            'children' => ['required', 'numeric', 'min:0'],
            'room_type_id' => ['required', 'string', Rule::exists(RoomType::class, $this->column_id)],
            'pay_upon_check_in' => ['required'],
            'description' => ['nullable', 'string'],
            'discount' => ['nullable', 'numeric', 'min:0'],
            'num_of_bed' => ['required'],
            // 'bed_size' => ['required', 'numeric', 'min:0'],
            // 'branch_id' => ['required', 'string', Rule::exists(Branch::class, $this->column_id)],
            'name' => ['required', 'string', Rule::unique(Room::class, 'name')],
            'images' => 'required|array',
            'images.*' => 'image|mimes:jpeg,png,jpg,gif|max:2048',
            'amount' => ['required', 'numeric', 'min:0'],
            'floor' => ['required', 'numeric', 'min:0'],
            'pay_is_checkin' => ['required'],
        ];
    }

    public function attributes()
    {
        return [
            'area' => "Diện tích phòng",
            'adults' => "Số người lớn",
            'children' => "Số trẻ em",
            'room_type_id' => "Loại phòng",
            'pay_is_checkin' => "Thanh toán khi nhận phòng",
            'description' => 'Mô tả ',
            'discount' => 'Mã ưu đãi',
            'status' => 'Trạng thái',
            'num_of_bed' => 'Số giường ',
            'bed_size' => 'Loại giường',
            'branch_id' => 'Chi nhánh ',
            'name' => 'Tên phòng',
            'images' => 'Ảnh phòng',
        ];
    }
}
