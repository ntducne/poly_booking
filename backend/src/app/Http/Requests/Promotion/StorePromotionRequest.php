<?php

namespace app\Http\Requests\Promotion;

use App\Http\Requests\Request;
use App\Models\Promotion;
use Illuminate\Validation\Rule;
class StorePromotionRequest extends Request
{

    public function rules()
    {
        return [
            'code' => ['bail', 'required', 'string',
                Rule::unique(Promotion::class, 'code')],
            'start_date' => ['bail', 'required', 'date' ,'date_format:"d/m/Y"'],
            'end_date'   => ['bail', 'required','date', 'date_format:"d/m/Y"'],
            'conditions' => ['bail', 'required', 'string']
        ];
    }

    public function attributes()
    {
        return [
            'code'       => 'Mã ưu đãi',
            'start_date' => 'Ngày bắt đầu',
            'end_date'   => 'Ngày hết hạn ',
            'conditions' => 'Điều kiện',
        ];
    }
}
