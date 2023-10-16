<?php

namespace App\Http\Requests\Services;

use Illuminate\Foundation\Http\FormRequest;

class StoreRequest extends FormRequest
{
    public function rules()
    {
        return [
           'service_name'=>['required'],
           'price'=>['required','numeric'],
           'description'=>['required'],
           'branch_id'=>['required']
        ];
    }
    public function attributes()
    {
        return [
            'service_name'   => 'Tên dịch vụ',
            'price'      => 'Giá',
            'description'     => 'Mô tả',
            'branch_id'     => 'ID chi nhánh',
        ];
    }
}
