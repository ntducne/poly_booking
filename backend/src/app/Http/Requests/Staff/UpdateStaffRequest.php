<?php

namespace App\Http\Requests\Staff;

use App\Http\Requests\Request;
use App\Models\Staff;
use Illuminate\Validation\Rule;
class UpdateStaffRequest extends Request
{
    public function rules()
    {
        return [
            'fullname' => ['bail', 'required', 'string'],
            'email'    => ['bail', 'required', 'email',
                Rule::unique(Staff::class)->ignore($this->staff, $this->column_id),
            ],
            'phone'    => ['bail', 'required', 'regex:/^([0-9\s\-\+\(\)]*)$/','max: 10','min:10',
                Rule::unique(Staff::class, 'phone')->ignore($this->staff,$this->column_id),
            ],
            'address' => [ 'required' ],
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
        ];
    }
}
