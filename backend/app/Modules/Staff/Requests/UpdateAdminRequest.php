<?php

namespace App\Modules\Staff\Requests;

use App\Enums\StatusEnum;
use App\Models\Admin;
use App\Http\Requests\Request;
use App\Rules\PhoneRule;
use Illuminate\Validation\Rule;

class UpdateAdminRequest extends Request
{
    public function rules()
    {
        return [
            'new_password' => ['bail', 'nullable', 'string', 'min:6'],
            'confirm_password' => ['bail', 'nullable', 'string', 'min:6', 'same:new_password'],
            'status' => ['bail', 'nullable', 'integer', Rule::in(StatusEnum::asArray())],
        ];
    }
    public function attributes()
    {
        return [
            'name' => 'Họ và Tên',
            'username' => 'Tên tài khoản',
            'email' => 'Email',
            'password' => 'Mật khẩu',
            'phone' => 'Số điện thoại',
            'address' => 'Địa chỉ',
            'status' => 'Trạng thái',
            'branch_id' => 'Chi nhánh khách sạn',
            'role' => 'Quyền truy cập'
        ];
    }
}
