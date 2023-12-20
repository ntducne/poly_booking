<?php

namespace App\Modules\Staff\Requests;

use App\Enums\RoleEnum;
use App\Enums\StatusEnum;
use App\Models\Admin;
use App\Models\Branch;
use App\Http\Requests\Request;
use Illuminate\Validation\Rule;

class UpdateAdminRequest extends Request
{
    public function rules()
    {
        return [
            'name' => ['bail', 'required', 'string'],
            'email' => ['bail', 'required', 'email', Rule::unique(Admin::class)->ignore($this->admin, $this->column_id)],
            'new_password' => ['bail', 'nullable', 'string', 'min:6'],
            'confirm_password' => ['bail', 'nullable', 'string', 'min:6', 'same:new_password'],
            'phone' => ['bail', 'required', 'numeric', 'regex:/(84|0[3|5|7|8|9])+([0-9]{8})\b/', Rule::unique(Admin::class)->ignore($this->admin, $this->column_id)],
            'status' => ['bail', 'nullable', 'integer', Rule::in(StatusEnum::asArray())],
            'branch_id' => ['bail', 'required', Rule::exists(Branch::class, $this->column_id)],
            // 'branch_id' => ['bail', 'required', Rule::exists(Branch::class, $this->column_id)],
            'role' => ['bail', 'required', 'string'],
            // 'image' => ['bail', 'nullable', 'image', 'mimes:jpeg,png,jpg,gif,svg', 'max:2048'],
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
