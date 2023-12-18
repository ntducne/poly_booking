<?php

namespace App\Modules\Branch\Requests;

use App\Http\Requests\Request;
use App\Models\Branch;
use App\Rules\PhoneRule;
use Illuminate\Validation\Rule;

class StoreBranchRequest extends Request
{
    public function rules()
    {
        return [
            'address' => ['bail', 'required', 'string'],
            'name'    => ['bail','required','string','max:255',
                Rule::unique(Branch::class, 'name')],
            'phone'   => ['bail','required', new PhoneRule(),
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
