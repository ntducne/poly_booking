<?php

namespace App\Modules\User\Requests;

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
