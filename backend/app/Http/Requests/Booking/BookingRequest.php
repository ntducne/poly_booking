<?php

namespace App\Http\Requests\Booking;

use Illuminate\Foundation\Http\FormRequest;

class BookingRequest extends FormRequest
{
    public function rules()
    {
        return [
            'checkin' => ['required', 'date_format:Y-m-d', 'after:today|before:checkout'],
            'checkout' => ['required', 'date_format:Y-m-d', 'after:today'],
            'adults' => ['required', 'numeric', 'min:0'],
            'children' => ['required', 'numeric', 'min:0'],
            'soLuong' => ['required', 'numeric', 'min:0'],
            'room_id' => ['required', 'exists:App\Models\Room,_id'],
            'branch_id' => ['required', 'exists:App\Models\Branch,_id'],
        ];
    }
    public function attributes()
    {
        return [
            'checkin' => 'Thời gian nhận phòng',
            'checkout' => 'Thời gian trả phòng',
            'adults' => 'Số người lớn ',
            'children' => 'Số trẻ em',
            'soLuong' => 'Số lượng phòng muốn đặt',
            'room_id' => 'Phòng muốn đặt',
            'branch_id' => 'Chi nhánh phòng muốn đặt'
        ];
    }
}