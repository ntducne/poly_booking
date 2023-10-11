<?php

namespace App\Http\Requests\Client;

use App\Http\Requests\Request;
use Illuminate\Validation\Rule;
class ChangePasswordRequest extends Request
{
    public function rules()
    {
        return [
            'password' => ['required', 'string', 'min:8'],
        ];
    }

}
