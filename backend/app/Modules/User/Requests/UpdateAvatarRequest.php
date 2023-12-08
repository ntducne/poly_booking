<?php

namespace App\Modules\User\Requests;

use App\Http\Requests\Request;
use App\Models\User;
use Illuminate\Validation\Rule;

class UpdateAvatarRequest extends Request
{
    public function rules()
    {
        return [
            'image'     => ['bail', 'required', 'image', 'mimes:jpeg,png,jpg,gif,svg', 'max:2048'],
        ];
    }
    public function attributes()
    {
        return [
            'image'    => 'Ảnh',
        ];
    }
}
