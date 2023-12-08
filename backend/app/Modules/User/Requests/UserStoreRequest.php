<?php

namespace App\Modules\User\Requests;

use App\Http\Requests\Request;
use App\Models\User;
use App\Rules\MailRule;
use App\Rules\PhoneRule;
use Illuminate\Validation\Rule;

class UserStoreRequest extends Request
{
    public function rules()
    {
        return [
            'name' => ['required'],
            'email' => ['required', new MailRule(), Rule::unique(User::class,'email')],
            'phone' => ['required', 'numeric', 'digits:10', new PhoneRule(), Rule::unique(User::class,'phone')],
            'password' => ['required', 'string', 'min:8'],
        ];
    }
}
