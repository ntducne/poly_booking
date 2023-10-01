<?php

namespace app\Http\Requests\Branch;

use App\Http\Requests\Request;
use App\Models\Branch;
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
            'phone' => ['bail','required','numeric','digits:10', 'regex:/(84|0[3|5|7|8|9])+([0-9]{8})\b/ ',
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
