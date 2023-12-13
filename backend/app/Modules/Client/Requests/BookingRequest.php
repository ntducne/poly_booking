<?php

namespace App\Modules\Client\Requests;

use App\Http\Requests\Request;
use App\Models\Branch;
use App\Models\Room;
use App\Rules\MailRule;
use App\Rules\PhoneRule;
use Illuminate\Validation\Rule;

class BookingRequest extends Request {
    public function rule() {
        return [
            'checkin' => [
                'required',
                'date',
                'after_or_equal:today',
            ],
            'checkout' => [
                'required',
                'date',
                'after_or_equal:checkin',
            ],
            'adult' => 'required|numeric',
            'child' => 'required|numeric',
            // 'branch_id' => [
            //     'required',
            //     Rule::exists(Branch::class, $this->column_id),
            // ],
            'amount_room' => [
                'required',
                'numeric',
                'min:1',
                // nhỏ hơn adult truyền vào
                function ($attribute, $value, $fail) {
                    if ($value > $this->adult) {
                        $fail('Số lượng phòng không được lớn hơn số người lớn');
                    }
                },
            ],

            'name' => [
                'required',
                'string',
                'min:3',
                'max:255',
            ],

            'email' => [
                'nullable',
                new MailRule(),
            ],

            'phone' => [
                'required',
                'numeric',
                'min:10',
                'max:11',
                new PhoneRule()
            ],

            'payment_method' => [
                'required',
            ],

            'room_type_id' => [
                'nullable',
                'numeric',
                'exists:room_types,_id',
            ],

            'room_id' => [
                'required',
                Rule::exists(Room::class, $this->column_id),
            ],


        ];
    }
}
