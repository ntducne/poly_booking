<?php

namespace App\Http\Requests\Admin;

use App\Enums\RoleEnum;
use App\Http\Requests\Request;
use App\Models\Admin;
use App\Models\Branch;
use Illuminate\Validation\Rule;
class StoreAdminRequest extends Request
{
    public function rules()
    {
        return [
            'image'     => ['bail', 'required', 'image', 'mimes:jpeg,png,jpg,gif,svg', 'max:2048'],
            'name'      => ['bail', 'required', 'string'],
            'email'     => ['bail', 'required', 'email', Rule::unique(Admin::class, 'email')],
            'password'  => ['bail', 'required', 'string', 'min:6'],
            'phone'     => ['bail', 'required', 'numeric', 'regex:/(84|0[3|5|7|8|9])+([0-9]{8})\b/', Rule::unique(Admin::class, 'phone')],
            'branch_id' => ['bail', 'required', Rule::exists(Branch::class, $this->column_id)],
            'role'      => ['bail', 'required', 'integer', Rule::in(RoleEnum::asArray())],
        ];
    }
    public function attributes()
    {
        return [
            'name'     => 'Họ và Tên',
            'email'    => 'Email',
            'password' => 'Mật khẩu',
            'phone'    => 'Số điện thoại',
            'address'  => 'Địa chỉ',
            'image'    => 'Ảnh',
            'status'   => 'Trạng thái',
            'branch_id'=> 'Chi nhánh khách sạn',
            'role'     => 'Quyền truy cập'
        ];
    }
}
