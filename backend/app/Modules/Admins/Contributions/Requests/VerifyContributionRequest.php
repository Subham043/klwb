<?php

namespace App\Modules\Admins\Contributions\Requests;

use App\Http\Requests\InputRequest;


class VerifyContributionRequest extends InputRequest
{

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'payment_id' => ['required', 'string', 'max:250', 'regex:/^KLWB-\d{8}\d*[A-Z0-9]*$/'],
            'amount' => ['required', 'numeric'],
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
            'payment_id' => 'Payment ID',
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
