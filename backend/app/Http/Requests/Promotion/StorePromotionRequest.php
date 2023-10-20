<?php

namespace app\Http\Requests\Promotion;

use App\Http\Requests\Request;
use App\Models\Promotion;
use App\Models\Branch;
use Illuminate\Validation\Rule;
class StorePromotionRequest extends Request
{

    public function rules()
    {
        return [
            'code' => ['bail', 'required', 'string', Rule::unique(Promotion::class, 'code')],
            'start_date' => ['bail', 'required', 'date'],
            'end_date'   => ['bail', 'required','date'],
            'conditions' => ['bail', 'required', 'string'],
            'branch_id'  => ['required', Rule::exists(Branch::class, $this->column_id)]
        ];
    }

    public function attributes()
    {
        return [
            'code'       => 'Mã ưu đãi',
            'start_date' => 'Ngày bắt đầu',
            'end_date'   => 'Ngày hết hạn ',
            'conditions' => 'Điều kiện',
            'branch_id'  => 'Mã khách sạn'
        ];
    }
}
