<?php

namespace App\Modules\Services\Requests;

use Illuminate\Foundation\Http\FormRequest;
use App\Models\Services;
use Illuminate\Validation\Rule;

class UpdateRequest extends FormRequest
{
    protected function prepareForValidation(): void
    {
        $this->merge(['service' => $this->route('service')]);
    }
    public function rules()
    {
        if (!Services::find($this->service)) {
            return [
                'service' => [
                    'bail',
                    'required',
                    Rule::exists(Services::class, $this->column_id)
                ],
            ];
        }
        return [
            'service_name' => [
                'required',
                'bail',
                Rule::unique(Services::class)->ignore($this->service, $this->column_id)
            ],
            'price' => ['required', 'numeric'],
            'description' => ['required'],
            'branch_id'=>['required','exists:App\Models\Branch,_id']
        ];
    }
    public function attributes()
    {
        return [
            'service_name' => 'Tên dịch vụ',
            'price' => 'Giá',
            'description' => 'Mô tả',
            'branch_id'     => 'ID chi nhánh',
        ];
    }
}
