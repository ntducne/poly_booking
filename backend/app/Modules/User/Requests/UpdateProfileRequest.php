<?php

namespace App\Modules\User\Requests;

use App\Http\Requests\Request;
use App\Models\User;
use Illuminate\Validation\Rule;
class UpdateProfileRequest extends Request
{
    public function rules()
    {
        return [
            'name' => [
                'bail','required','string',
            ],
            'email' => [
                'bail','required', 'string','email',
                Rule::unique(User::class)->ignore($this->user, $this->column_id),
            ],
            'phone' => [
                'bail','required', 'numeric', 'digits:10', 'max:255', 'regex:/(84|0[3|5|7|8|9])+([0-9]{8})\b/g',
                Rule::unique(User::class, 'phone')->ignore($this->user,$this->column_id),
            ],
            'address' => [ 'required' ],
        ];
    }

}
