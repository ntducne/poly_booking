<?php

namespace App\Modules\Branch\Requests;

use App\Http\Requests\Request;
use App\Models\Branch;
use App\Rules\PhoneRule;
use Illuminate\Validation\Rule;
class UpdateBranchRequest extends Request
{
    public function prepareForValidation()
    {
        $this->merge(['branch' => $this->route('branch')]);
    }

    public function rules()
    {
        if(!Branch::find($this->branch)){
            return [
                'branch' => [
                    'bail', 'required',
                    Rule::exists(Branch::class, $this->column_id)
                ],
            ];
        }

        return [
            'address' => [ 'required' ],
            'name' => [
                'bail','required','string',
                Rule::unique(Branch::class)->ignore($this->branch, $this->column_id),
            ],
            'phone' => ['bail','required', new PhoneRule(),
                Rule::unique(Branch::class,'phone')->ignore($this->branch, $this->column_id)],
        ];
    }
    public function attributes()
    {
        return [
            'branch'    => 'Chi nhánh khách sạn',
            'address'   => 'Địa chỉ chi nhánh',
            'name'      => 'Tên chi nhánh khách sạn',
            'phone'     => 'Hotline',
        ];
    }
}
