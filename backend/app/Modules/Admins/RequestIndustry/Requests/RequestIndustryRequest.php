<?php

namespace App\Modules\Admins\RequestIndustry\Requests;

use App\Http\Requests\InputRequest;


class RequestIndustryRequest extends InputRequest
{

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'company' => 'required|string|max:500',
            'email' => 'required|email:rfc,dns',
            'mobile' => 'required|numeric|digits:10,phone',
            'address' => 'required|string|max:500',
            'register_doc' => 'required|file|extensions:jpg,jpeg,png|min:1|max:515',
            'city_id' => 'required|numeric|exists:cities,id',
            'taluq_id' => 'required|numeric|exists:taluqs,id',
            'captcha' => 'required|captcha'
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
            'city_id' => 'District',
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
