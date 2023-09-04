<?php

namespace App\Http\Requests\Services;

use Illuminate\Foundation\Http\FormRequest;

class UpdateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'service_name' => 'required',
            'price' => 'required|numeric|min:0',
            'description' => 'required'
        ];
    }
    public function messages()
    {
        return [
            'service_name.required'=>'Dịch vụ không được để trống',
            'price.required'=>'Giá không được để trống',
            'price.min'=>'Giá không để giá trị âm ',
            'description.required'=>'Mô tả không được để trống',
        ];
    }
}
