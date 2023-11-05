<?php

namespace App\Http\Requests\Booking\AdminBooking;

use Illuminate\Foundation\Http\FormRequest;

class StoreRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function rules(): array
    {
        return [
            'checkin' => ['required', 'date_format:Y-m-d', 'after:today'],
            'checkout' => ['required', 'date_format:Y-m-d', 'after:today', 'after:checkin'],
            'adults' => ['required', 'numeric', 'min:0'],
            'children' => ['required', 'numeric', 'min:0'],
            'name' => ['required'],
            'email' => ['required', 'email'],
            'phone' => ['required', 'numeric', 'digits:10', 'regex:/(84|0[3|5|7|8|9])+([0-9]{8})/'],
            'amount_room' => ['required', 'numeric'],
            'payment_method' => ['required'],
            'room_type_id' => ['required', 'exists:App\Models\RoomType,_id'],
            'branch_id' => ['required', 'exists:App\Models\Branch,_id']
        ];
    }
    public function attributes()
    {
        return [
            'checkin' => 'Thời gian nhận phòng',
            'checkout' => 'Thời gian trả phòng',
            'adults' => 'Số người lớn ',
            'children' => 'Số trẻ em',
            'name'=>'Tên khách hàng',
            'email'=>'Email ',
            'phone'=>'Số điện thoại',
            'amount_room'=> 'Số lượng phòng muốn đặt',
           ' payment_method'=> 'Phương thức thanh toán ',
            'room_type_id' => 'Kiểu phòng',
            'branch_id' => 'Chi nhánh phòng muốn đặt'
        ];
    }
}
