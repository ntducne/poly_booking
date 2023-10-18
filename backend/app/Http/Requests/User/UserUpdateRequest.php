<?php

namespace App\Http\Requests\User;

use App\Enums\StatusEnum;
use App\Http\Requests\Request;
use App\Models\User;
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
                'bail','required', 'string','email',
                Rule::unique(User::class)->ignore($this->user, $this->column_id),
            ],
            'phone' => [
                'bail','required', 'numeric', 'digits:10', 'regex:/(84|0[3|5|7|8|9])+([0-9]{8})\b/g',
                Rule::unique(User::class, 'phone')->ignore($this->user,$this->column_id),
            ],
            'address' => [ 'required' ],
            'status' => [
                'bail', 'required', 'integer',
                Rule::in(StatusEnum::asArray()),
            ],
        ];
    }
}
