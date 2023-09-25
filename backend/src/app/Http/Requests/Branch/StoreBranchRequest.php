<?php

namespace app\Http\Requests\Branch;

use App\Http\Requests\Request;
use App\Models\Branch;
use Illuminate\Validation\Rule;

class StoreBranchRequest extends Request
{
    public function rules()
    {
        return [
            'address' => ['bail', 'required', 'string'],
            'name'    => ['bail','required','string','max:255',
                Rule::unique(Branch::class, 'name')],
            'phone'   => ['bail','required','numeric','digits:10', 'regex:/(84|0[3|5|7|8|9])+([0-9]{8})\b/',
                Rule::unique(Branch::class,'phone')]
        ];
    }
    public function attributes()
    {
        return [
            'address'   => 'Địa chỉ chi nhánh',
            'name'      => 'Tên chi nhánh khách sạn',
            'phone'     => 'Hotline',
        ];
    }

}
