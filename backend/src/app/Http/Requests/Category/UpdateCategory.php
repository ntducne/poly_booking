<?php

namespace App\Http\Requests\Category;

use App\Enums\StatusEnum;
use App\Http\Requests\Request;
use App\Models\Category;
use Illuminate\Validation\Rule;

class UpdateCategory extends Request
{

    public function rules(): array
    {
        if (!Category::find($this->category)) {
            return [
                'category' => [
                    'bail', 'required',
                    Rule::exists(Category::class, $this->column_id)
                ],
            ];
        }

        return [
            'name_category' => [
                'bail', 'required', 'string',
                Rule::unique(Category::class)->ignore($this->category, $this->column_id),
            ],
            'status' => [
                'bail', 'required', 'integer',
                Rule::in(StatusEnum::asArray()),
            ],
        ];

    }

    public function attributes(): array
    {
        return [
            'category'      => 'Danh muc',
            'name_category' => 'Ten danh muc',
            'status'        => 'Trang thai danh muc',
        ];
    }

}
