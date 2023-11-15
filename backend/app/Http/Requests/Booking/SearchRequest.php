<?php

namespace App\Http\Requests\Booking;

use Illuminate\Foundation\Http\FormRequest;

class SearchRequest extends FormRequest
{
    public function rules()
    {
        return [
            'checkin' => ['required', 'date_format:Y-m-d', 'after:today'],
            'checkout' => ['required', 'date_format:Y-m-d', 'after:today','after:checkin'],
            'adult' => ['required', 'numeric', 'min:0'],
            'child' => ['required', 'numeric', 'min:0'],
            'branch_id' => ['required', 'exists:App\Models\Branch,_id'],
            'soLuong'=>['required', 'numeric', 'min:0']
        ];
    }
    public function attributes()
    {
        return [
            'checkin' => 'Thời gian nhận phòng',
            'checkout' => 'Thời gian trả phòng',
            'adult' => 'Số người lớn ',
            'child' => 'Số trẻ em',
            'branch_id' => 'Chi nhánh phòng muốn đặt',
            'soLuong'=> 'Số Lượng phòng'
        ];
    }
}
