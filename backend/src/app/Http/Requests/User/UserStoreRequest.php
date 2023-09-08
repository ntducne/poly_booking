<?php

namespace App\Http\Requests\User;

use App\Http\Requests\Request;
use App\Models\User;
use Illuminate\Validation\Rule;

class UserStoreRequest extends Request
{
    public function rules()
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', Rule::unique(User::class,'email')],
            'phone' => ['required', 'numeric', 'digits:10', 'max:255', 'regex:/(84|0[3|5|7|8|9])+([0-9]{8})\b/g', Rule::unique(User::class,'phone')],
            'password' => ['required', 'string', 'min:8'],
        ];
    }
}
