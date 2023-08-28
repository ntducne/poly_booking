<?php

namespace App\Http\Requests\Staff;

use App\Http\Requests\Request;
use App\Models\Staff;
use Illuminate\Validation\Rule;
class StoreStaffRequest extends Request
{
    public function rules()
    {
        return [
            'fullname' => ['bail', 'required', 'string'],
            'email'    => ['bail', 'required', 'email',
                Rule::unique(Staff::class, 'email'),
            ],
            'password' => ['bail','required','string','min:6'],
            'phone'    => ['bail', 'required', 'regex:/^([0-9\s\-\+\(\)]*)$/','max: 10','min:10',
                Rule::unique(Staff::class, 'phone'),
            ],
            'address' => [ 'required' ],
            'image' => [ 'bail','required','image','mimes:jpg,png' ],
            'active' => [ 'required' ],
        ];
    }
    public function attributes()
    {
        return [
            'fullname' => 'Họ và Tên',
            'email' => 'Email',
            'password' => 'Mật khẩu',
            'phone' => 'Số điện thoại',
            'address' => 'Địa chỉ',
            'image' => 'Ảnh',
            'Active' => 'Trạng thái',
        ];
    }
}
