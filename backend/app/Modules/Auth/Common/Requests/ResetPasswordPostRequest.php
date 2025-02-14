<?php

namespace App\Modules\Auth\Common\Requests;

use App\Http\Requests\InputRequest;
use Illuminate\Validation\Rules\Password;
use App\Http\Services\RateLimitService;

class ResetPasswordPostRequest  extends InputRequest
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
        return [
            // 'captcha' => 'required|captcha',
            'otp' => ['required','numeric', 'digits:4'],
            'password_confirmation' => 'string|min:8|required_with:password|same:password',
            'password' => ['required',
                'string',
                Password::min(8)
                        ->letters()
                        ->mixedCase()
                        ->numbers()
                        ->symbols()
            ],
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
