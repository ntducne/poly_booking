<?php


namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class Request extends FormRequest
{
    protected string $column_id = '_id';


    public function authorize(): bool
    {
        return true;
    }

    public function messages(): array
    {
        return [
            'exists' => ':attribute không tồn tại !',
            'required' => ':attribute bắt buộc phải điền !',
            'string' => ':attribute phải là chuỗi !',
            'integer' => ':attribute phải là số nguyên !',
            'unique' => ':attribute đã được dùng !',
            'min' => ':attribute phải có ít nhất :min ký tự !',
            'max' => ':attribute không được vượt quá :max ký tự !',
            'array' => ':attribute phải là mảng !',
            'in' => ':attribute không thuộc danh sách giá trị hợp lệ !',
            'mime' => ':attribute định dạng không hợp lệ !',
            'same' => ':attribute không trùng khớp !',
            'size' => ':attribute phải có kích thước nhỏ hơn :size !',
            'image' => 'File không phải là ảnh !',
            'lte' => ':attribute không vượt quá 100% ! ',
            'after:date' => ':attribute phải sau ngày :date !',
            'after_or_equal:date' => ':attribute phải sau hoặc bằng ngày :date !',
            'alpha' => ':attribute chỉ được chứa chữ cái !',
            'alpha_dash' => ':attribute chỉ được chứa chữ cái, số và dấu gạch ngang !',
            'alpha_num' => ':attribute phải là số !',
            'before:date' => ':attribute phải trước ngày :date !',
            'before_or_equal:date' => ':attribute phải trước hoặc bằng ngày :date !',
            'between:min,max' => ':attribute phải nằm trong khoảng :min và :max !',
            'boolean' => ':attribute phải là true hoặc false !',
            'confirmed' => ':attribute không trùng khớp !',
            'date' => ':attribute không phải là ngày tháng !',
            'date_equals:date' => ':attribute phải bằng ngày :date !',
            'date_format:format' => ':attribute không đúng định dạng :format !',
            'different:field' => ':attribute phải khác :field !',
            'digits:value' => ':attribute phải có :value chữ số !',
            'digits_between:min,max' => ':attribute phải có từ :min đến :max chữ số !',
            'dimensions' => ':attribute có kích thước không hợp lệ !',
            'distinct' => ':attribute có giá trị trùng lặp !',
            'email' => ':attribute phải là email !',
            'filled' => ':attribute không được để trống !',
            'gt:value' => ':attribute phải lớn hơn :value !',
            'gte:value' => ':attribute phải lớn hơn hoặc bằng :value !',
            'regex:pattern' => ':attribute không đúng định dạng :pattern !',
            'url' => ':attribute không đúng định dạng url !',
            'json' => ':attribute không đúng định dạng json !',
            'mimetypes' => ':attribute không đúng định dạng !',
            'not_in:values' => ':attribute không thuộc danh sách giá trị hợp lệ !',
            'not_regex:pattern' => ':attribute không đúng định dạng :pattern !',
            'nullable' => ':attribute có thể để trống !',
            'present' => ':attribute phải có !',
            'required_if:anotherfield,value' => ':attribute bắt buộc phải điền khi :anotherfield có giá trị :value !',
            'required_unless:anotherfield,value' => ':attribute bắt buộc phải điền trừ khi :anotherfield có giá trị :value !',
        ];
    }

    protected function failedValidation(Validator $validator)
    {
        $errors = $validator->errors();

        $formattedErrors = [];

        foreach ($errors->messages() as $field => $errorMessages) {
            $formattedErrors[$field] = $errorMessages[0];
        }

        throw new HttpResponseException(response()->json([
            'status' => false,
            'message' => 'Lỗi dữ liệu !',
            'error' => $formattedErrors
        ], 422));
    }
}
