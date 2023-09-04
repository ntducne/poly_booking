<?php

namespace App\Http\Requests\Booking;

use Illuminate\Foundation\Http\FormRequest;

class StoreRequest extends FormRequest
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
            'checkin' => 'required|date',
            'checkout' => 'required|date|after:checkin',
            //    'pay_date'=>'required|date|after:checkout',
            'representative' => 'required',
            'amount_of_people' => 'required|numeric|min:0'
        ];
    }
    public function messages()
    {
        return
            [
                'checkin.required' => 'Thời gian Check in không để trống',
                'checkin.date' => 'Thời gian phải đúng năm - tháng - ngày ',
                'checkout.date' => 'Thời gian phải đúng năm - tháng - ngày ',
                'checkout.after' => 'Thời gian phải sau ngày Check in ',
                'representative.required' => 'Mục nầy không được để trống',
                'amount_of_people.required' => 'Số người không được để trống',
                'amount_of_people.min' => 'Số người không được để số âm',

            ];
    }
}