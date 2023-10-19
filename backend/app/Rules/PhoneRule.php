<?php

namespace App\Rules;

use Illuminate\Contracts\Validation\Rule;

class PhoneRule implements Rule
{
    public function passes($attribute, $value)
    {
        if(preg_match(' /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/', $value)){
            return true;
        } else {
            return false;
        }
    }

    public function message()
    {
        return 'Số điện thoại không hợp lệ !';
    }

}
