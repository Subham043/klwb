<?php

namespace App\Modules\Auth\Industry\Accounts\Requests;

use App\Http\Requests\InputRequest;
use App\Http\Services\RateLimitService;


class ProfileVerifyPostRequest extends InputRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize(): bool
    {
        (new RateLimitService($this))->ensureIsNotRateLimited(3);
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        $user = $this->user();
        return [
            'otp' => ['required','numeric', 'digits:4', 'exists:industry_auths,otp', function ($attribute, $value, $fail) use ($user) {
                if ($value != $user->otp) {
                    $fail('Invalid OTP.');
                }
            }],
            'captcha' => 'required|captcha'
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
            'otp.exists' => 'Invalid OTP.',
        ];
    }
}
