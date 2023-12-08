<?php

namespace App\Modules\Services\Requests;

use App\Http\Requests\Request;

class StoreRequest extends Request
{
    public function rules()
    {
        return [
            'service_name' => ['required'],
            'price' => ['required', 'numeric'],
            'description' => ['required'],
            'branch_id' => ['required', 'array' ,'exists:App\Models\Branch,_id']
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
