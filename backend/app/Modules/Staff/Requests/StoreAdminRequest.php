<?php

namespace App\Modules\Staff\Requests;

use App\Enums\RoleEnum;
use App\Http\Requests\Request;
use App\Models\Admin;
use App\Models\Branch;
use App\Rules\MailRule;
use App\Rules\PhoneRule;
use Illuminate\Validation\Rule;
class StoreAdminRequest extends Request
{
    public function rules()
    {
        return [
            'image'     => ['bail', 'required', 'image', 'mimes:jpeg,png,jpg,gif,svg', 'max:2048'],
            'name'      => ['bail', 'required', 'string'],
            'email'     => ['bail', 'required', new MailRule() , Rule::unique(Admin::class, 'email')],
            'password'  => ['bail', 'required', 'string', 'min:6'],
            'phone'     => ['bail', 'required', new PhoneRule() , Rule::unique(Admin::class, 'phone')],
            'role'      => ['bail', 'required', 'string' ]
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
