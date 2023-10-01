<?php

namespace App\Http\Requests\Admin;

use App\Http\Requests\Request;
use App\Models\Admin;
use App\Models\Branch;
use Illuminate\Validation\Rule;
class StoreAdminRequest extends Request
{
    public function rules()
    {
        return [
            'image'     => [ 'bail','required','image','mimes:jpg,png' ],
            'name'      => ['bail', 'required', 'string'],
            'username'  => ['required','string',
                Rule::unique(Admin::class, 'username')],
            'email'     => ['bail', 'required', 'email',
                Rule::unique(Admin::class, 'email'),
            ],
            'password'  => ['bail','required','string','min:8'],
            'phone'     => ['required', 'numeric', 'digits:10', 'regex:/(84|0[3|5|7|8|9])+([0-9]{8})\b/',
                Rule::unique(Admin::class, 'phone'),
            ],
            'address'   => [ 'required','string'],
            'status'    => [ 'required'],
            'branch_id' => ['required',
                Rule::exists(Branch::class, $this->column_id)],
            'role'      => ['required'],
        ];
    }
    public function attributes()
    {
        return [
            'name'     => 'Họ và Tên',
            'username' => 'Tên tài khoản',
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
