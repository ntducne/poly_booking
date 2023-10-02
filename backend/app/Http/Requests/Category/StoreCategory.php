<?php

namespace App\Http\Requests\Category;

use App\Http\Requests\Request;
use App\Models\Category;
use Illuminate\Validation\Rule;

class StoreCategory extends Request
{
    public function rules(): array
    {
        return [
            'name_category' => [
                'bail', 'required', 'string',
                Rule::unique(Category::class,'name_category'),
            ]
        ];
    }

    public function attributes(): array
    {
        return [
            'name_category' => 'Ten danh muc',
        ];
    }
}
