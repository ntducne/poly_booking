<?php

namespace App\Http\Requests\Booking;

use Illuminate\Foundation\Http\FormRequest;

class SearchRequest extends FormRequest
{
    public function rules()
    {
        return [
            'checkin' => ['required', 'date_format:Y-m-d', 'after:today|before:checkout'],
            'checkout' => ['required', 'date_format:Y-m-d', 'after:today'],
            'adult' => ['required', 'numeric', 'min:0'],
            'child' => ['required', 'numeric', 'min:0'],
            'room_type_id' => ['required', 'exists:App\Models\RoomType,_id'],
            'branch_id' => ['required', 'exists:App\Models\Branch,_id'],
        ];
    }
    public function attributes()
    {
        return [
            'checkin' => 'Thời gian nhận phòng',
            'checkout' => 'Thời gian trả phòng',
            'adult' => 'Số người lớn ',
            'child' => 'Số trẻ em',
            'room_type_id' => 'Kiểu phòng',
            'branch_id' => 'Chi nhánh phòng muốn đặt'
        ];
    }
}
