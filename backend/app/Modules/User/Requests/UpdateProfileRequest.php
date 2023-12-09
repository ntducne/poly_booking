<?php

namespace App\Modules\User\Requests;

use App\Http\Requests\Request;
use App\Models\User;
use App\Rules\MailRule;
use App\Rules\PhoneRule;
use Illuminate\Validation\Rule;
class UpdateProfileRequest extends Request
{
    public function rules()
    {
        return [
            'name' => [
                'bail', 'required', 'string'
            ],
            'phone' => [
                'bail','required', 'digits:10', new PhoneRule(),
                Rule::unique(User::class, 'phone')->ignore(request()->user()->id,$this->column_id),
            ],
        ];
    }
}