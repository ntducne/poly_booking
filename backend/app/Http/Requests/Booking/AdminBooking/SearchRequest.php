<?php

namespace App\Http\Requests\Booking\AdminBooking;

use Illuminate\Foundation\Http\FormRequest;

class SearchRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function rules(): array
    {
        return [
            'check_in' => ['required', 'date_format:Y-m-d', 'after:today'],
            'check_out' => ['required', 'date_format:Y-m-d', 'after:today','after:check_in'],
            'adults' => ['required', 'numeric', 'min:0'],
            'children' => ['required', 'numeric', 'min:0'],
            'room_type_id' => ['required', 'exists:App\Models\RoomType,_id'],
            'branch_id' => ['required', 'exists:App\Models\Branch,_id']
        ];
    }
    public function attributes()
    {
        return [
            'check_in' => 'Thời gian nhận phòng',
            'check_out' => 'Thời gian trả phòng',
            'adults' => 'Số người lớn ',
            'children' => 'Số trẻ em',
            'room_type_id' => 'Kiểu phòng',
            'branch_id' => 'Chi nhánh phòng muốn đặt'
        ];
    }
}
