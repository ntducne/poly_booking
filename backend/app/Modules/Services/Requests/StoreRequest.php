<?php

namespace App\Modules\Services\Requests;

use App\Models\Branch;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreRequest extends FormRequest
{
    public function rules()
    {
        return [
            'service_name' => ['required'],
            'price' => ['required', 'numeric'],
            'description' => ['required'],
            'branch_id' => ['required', 'exists:App\Models\Branch,_id']
        ];
    }
    public function attributes()
    {
        return [
            'service_name' => 'Tên dịch vụ',
            'price' => 'Giá',
            'description' => 'Mô tả',
            'branch_id' => 'ID chi nhánh',
        ];
    }
}
