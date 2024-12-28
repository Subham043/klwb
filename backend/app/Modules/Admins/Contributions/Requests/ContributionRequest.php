<?php

namespace App\Modules\Admins\Contributions\Requests;

use App\Http\Requests\InputRequest;


class ContributionRequest extends InputRequest
{

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'male' => ['required', 'numeric', function ($attribute, $value, $fail) {
                if ($value==0 && $this->female==0) {
                    $fail('Male or Female count should be greater than 0.');
                }
            }],
            'female' => ['required', 'numeric', function ($attribute, $value, $fail) {
                if ($value==0 && $this->male==0) {
                    $fail('Male or Female count should be greater than 0.');
                }
            }],
            'price' => ['required', 'numeric', 'gte:1'],
            'interest' => ['required', 'numeric', 'gte:0'],
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
