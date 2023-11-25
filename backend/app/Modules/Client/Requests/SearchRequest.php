<?php

namespace App\Modules\Client\Requests;

use App\Http\Requests\Request;

class SearchRequest extends Request
{
    public function rules()
    {
        return [
            'checkin' => [
                'required',
                'date',
                'after_or_equal:today',
            ],
            'checkout' => [
                'required',
                'date',
                'after_or_equal:checkin',
            ],
            'adult' => 'required|numeric',
            'children' => 'required|numeric',
            'branch_id' => [
                'required',
                'numeric',
                'exists:branches,_id',
            ],
            'amount_room' => [
                'required',
                'numeric',
                'min:1',
                // nhỏ hơn adult truyền vào
                function ($attribute, $value, $fail) {
                    if ($value > $this->adult) {
                        $fail('Số lượng phòng không được lớn hơn số người lớn');
                    }
                },
            ],
        ];
    }

    public function messages(): array
    {
        return [
            'checkin.required' => 'Vui lòng nhập ngày nhận phòng',
            'checkin.after_or_equal' => 'Ngày nhận phòng không được nhỏ hơn ngày hiện tại',
            'checkin.date' => 'Ngày nhận phòng không hợp lệ',
            'checkout.required' => 'Vui lòng nhập ngày trả phòng',
            'checkout.date' => 'Ngày trả phòng không hợp lệ',
            'adult.required' => 'Vui lòng nhập số người lớn',
            'adult.numeric' => 'Số người lớn không hợp lệ',
            'child.required' => 'Vui lòng nhập số trẻ em',
            'child.numeric' => 'Số trẻ em không hợp lệ',
            'branch_id.required' => 'Vui lòng nhập mã chi nhánh',
            'branch_id.numeric' => 'Mã chi nhánh không hợp lệ',
            'amount_room.required' => 'Vui lòng nhập số lượng phòng',
            'amount_room.numeric' => 'Số lượng phòng không hợp lệ',
        ];
    }
}
