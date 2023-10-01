<?php

namespace app\Http\Requests\Room;

use App\Http\Requests\Request;
use Illuminate\Validation\Rule;
use App\Models\Branch;
use App\Models\RoomType;
use App\Models\Room;

class UpdateRoomRequest extends Request
{
    public function rules()
    {
        return [
            'area' => ['required', 'numeric', 'min:0'],
            'num_of_people' => ['required','numeric', 'min:0'],
            'room_type_id' => ['required', 'string',
                Rule::exists(RoomType::class, 'id')],
            'pay_upon_check_in' => ['required'],
            'description' => ['required', 'string'],
            'discount'    => ['required', 'numeric', 'min:0'],
            'status'      => ['required'],
            'num_of_bed'  => ['required', 'numeric', 'min:0'],
            'bed_size'    => ['required', 'numeric', 'min:0'],
            'branch_id'   => ['required','string',
                Rule::exists(Branch::class, 'id')],
            'name'        => ['required', 'string',
                Rule::unique(Room::class, 'name')->ignore($this->room, $this->column_id)],
        ];
    }
    public function attributes()
    {
        return [
            'area' => "Diện tích phòng",
            'num_of_people' => "Số người trên một phòng",
            'room_type_id' => "Loại phòng",
            'pay_upon_check_in' => "Thanh toán khi nhận phòng",
            'description' => 'Mô tả ',
            'discount'    => 'Mã ưu đãi',
            'status'      => 'Trạng thái',
            'num_of_bed'  => 'Số giường ',
            'bed_size'    => 'Loại giường',
            'branch_id'   => 'Chi nhánh ',
            'name'        => 'Tên phòng',
        ];
    }
}
