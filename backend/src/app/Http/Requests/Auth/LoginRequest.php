<?php

namespace App\Http\Requests\Auth;

use App\Http\Requests\Request;
use App\Models\User;
use Illuminate\Validation\Rule;
class LoginRequest extends Request
{
    public function rules(): array
    {


        return [
            'email'     => [
                'bail', 'required', 'string', 'email',
                Rule::exists(User::class,'email')->where(function ($query) {
                    $query->where('status', 0);
                }),
            ],
            'password'  => [
                'bail', 'required', 'string', 'min:1'
            ],
        ];
    }
    public function attributes(): array
    {
        return [
            'email'     => 'Email',
            'password'  => 'Mật khẩu',
        ];
    }
}
