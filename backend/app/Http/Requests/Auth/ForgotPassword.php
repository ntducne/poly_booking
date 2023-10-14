<?php

namespace App\Http\Requests\Auth;

use App\Http\Requests\Request;
use App\Models\PasswordReset;
use App\Models\User;
use Illuminate\Validation\Rule;

class ForgotPassword extends Request
{
    public function rules(): array
    {
        $token = $this->request->get('token');
        if (!PasswordReset::where('token', $token)->first()) {
            return [
                'token' => [
                    'bail', 'required',
                    Rule::exists(PasswordReset::class, 'token')
                ],
            ];
        }
        return [
            'old_password' => 'bail|required|min:6|max:32',
            'new_password' => 'bail|required|min:6|max:32|different:old_password',
            'new_password_confirmation' => 'bail|required|min:6|max:32|same:new_password|different:old_password',
        ];
    }
    public function attributes(): array
    {
        return [
            'old_password' => 'Mật khẩu cũ',
            'new_password' => 'Mật khẩu mới',
            'new_password_confirmation' => 'Nhập lại mật khẩu mới',
        ];
    }

    public function messages(): array
    {
        $parent = parent::messages();
        $custom = [
            'token.required' => 'Không tìm thấy Token',
            'token.exists' => 'Token không tồn tại',
        ];
        return array_merge($parent, $custom);
    }
}
