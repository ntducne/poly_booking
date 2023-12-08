<?php

namespace App\Modules\Services\Requests;

<<<<<<< HEAD
use App\Http\Requests\Request;

=======
use App\Models\Branch;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use App\Http\Requests\Request;


>>>>>>> d781f7fc180cdbe1bf1334194000f7f4c0777c98
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
