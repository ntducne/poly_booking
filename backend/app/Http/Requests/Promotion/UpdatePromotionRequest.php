<?php

namespace app\Http\Requests\Promotion;

use App\Http\Requests\Request;
use App\Models\Branch;
use App\Models\Promotion;
use Illuminate\Validation\Rule;
class UpdatePromotionRequest extends Request
{
    public function rules()
    {
            return [
                'code' => ['bail', 'required', 'string', Rule::unique(Promotion::class, 'code')->ignore($this->promotion, $this->column_id),],
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
