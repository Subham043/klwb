<?php

namespace App\Modules\Admins\RequestInstitutes\Requests;

use App\Http\Requests\InputRequest;


class RequestInstituteRequest extends InputRequest
{

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'name' => 'required|string|max:500',
            'email' => 'required|email:rfc,dns',
            'mobile' => 'required|numeric|digits:10,phone',
            'pincode' => 'required|string|max:500',
            'address' => 'required|string|max:500',
            'register_doc' => 'required|file|extensions:jpg,jpeg,png|min:1|max:515',
            'taluq_id' => 'required|numeric|exists:taluqs,id',
            // 'captcha' => 'required|captcha'
        ];
    }

    /**
     * Get custom attributes for validator errors.
     *
     * @return array<string, string>
     */
    public function attributes(): array
    {
        return [
            'is_active' => 'Active',
            'taluq_id' => 'Taluq',
        ];
    }

    /**
     * Get the error messages for the defined validation rules.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'captcha.captcha' => 'Invalid Captcha. Please try again.',
        ];
    }

}
