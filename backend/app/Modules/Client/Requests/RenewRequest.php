<?php

namespace App\Modules\Client\Requests;

use App\Http\Requests\Request;
use App\Rules\MailRule;
use App\Rules\PhoneRule;

class RenewRequest extends Request {
    public function rule(){
        return [
            'billing_id' => [ 'required', 'numeric', 'exists:billings,_id' ],
            'checkin' => [ 'required', 'date', 'after_or_equal:today' ],
            'checkout' => [ 'required', 'date', 'after_or_equal:checkin' ],
            'newCheckout' => [ 'required',  'date',  'after_or_equal:checkout' ],
            'adult' => 'required|numeric',
            'children' => 'required|numeric',
            'branch_id' => [ 'required',  'numeric', 'exists:branches,_id' ],
            'amount_room' => [ 'required',  'numeric', 'min:1',
                // nhỏ hơn adult truyền vào
                function ($attribute, $value, $fail) {
                    if ($value > $this->adult) {
                        $fail('Số lượng phòng không được lớn hơn số người lớn');
                    }
                },
            ],
            'name' => [ 'nullable', 'string', 'min:3', 'max:255' ],
            'email' => [ 'nullable', new MailRule() ],
            'phone' => [ 'nullable', 'numeric', 'min:10', 'max:11', new PhoneRule() ],
            'note' => [ 'nullable', 'string', 'max:255' ],
        ];
    }
}
