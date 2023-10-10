<?php

namespace App\Http\Requests\Auth;

use App\Http\Requests\Request;
use App\Models\User;
use Illuminate\Validation\Rule;

class RegisterRequest extends Request
{
    public function rules(): array
    {
        return [
            'name' => ['bail','required','string'],
            'email' => ['bail','required','string','email', Rule::unique(User::class, 'email')],
            'password' => ['bail','required','string','min:6'],
            'password_confirmation' => ['bail','required','string','min:6','same:password'],
        ];
    }
    public function attributes(): array
    {
        return [
            'name' => 'Họ và tên',
            'email' => 'Email',
            'password' => 'Mật khẩu',
        ];
    }
}
