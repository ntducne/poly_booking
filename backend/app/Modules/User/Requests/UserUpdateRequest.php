<?php

namespace App\Modules\User\Requests;

use App\Enums\StatusEnum;
use App\Http\Requests\Request;
use App\Models\User;
use App\Rules\MailRule;
use App\Rules\PhoneRule;
use Illuminate\Validation\Rule;

class UserUpdateRequest extends Request
{
    protected function prepareForValidation():void
    {
        $this->merge(['user' => $this->route('user')]);
    }

    public function rules(): array
    {
        if (!User::find($this->user)) {
            return [
                'user' => [
                    'bail', 'required',
                    Rule::exists(User::class, $this->column_id)
                ],
            ];
        }
        return [
            'name' => [
                'bail','required','string',
            ],
            'email' => [
                'bail','required', new MailRule(),
                Rule::unique(User::class)->ignore($this->user, $this->column_id),
            ],
            'phone' => [
                'bail', 'required', new PhoneRule(),
                Rule::unique(User::class, 'phone')->ignore($this->user, $this->column_id),
            ],
            'address' => [ 'required' ],
            'status' => [
                'bail', 'required', 'integer',
                Rule::in(StatusEnum::asArray()),
            ],
        ];
    }
}
