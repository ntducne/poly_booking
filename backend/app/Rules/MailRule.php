<?php

namespace App\Rules;

use Illuminate\Contracts\Validation\Rule;

class MailRule implements Rule
{
    public function passes($attribute, $value)
    {
        if(preg_match('/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/', $value)){
            return true;
        } else {
            return false;
        }
    }

    public function message()
    {
        return 'Email không hợp lệ !';
    }

}
