<?php

namespace App\Modules\User\Requests;

use App\Http\Requests\Request;
use Illuminate\Validation\Rule;
class ChangePasswordRequest extends Request
{
    public function rules()
    {
        return [
            'old_password' => ['required', 'string', 'min:8'],
            'new_password' => ['required', 'string', 'min:8'],
            'confirm_new_password' => ['required', 'string', 'min:8', 'same:new_password'],
        ];
    }

}
