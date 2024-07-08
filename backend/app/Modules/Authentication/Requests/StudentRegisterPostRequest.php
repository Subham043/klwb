<?php

namespace App\Modules\Authentication\Requests;

use App\Http\Services\RateLimitService;
use Illuminate\Foundation\Http\FormRequest;
use Stevebauman\Purify\Facades\Purify;
use Illuminate\Validation\Rules\Password as PasswordValidation;


class StudentRegisterPostRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
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
            'name' => ['required', 'string'],
            'email' => ['required','email:rfc,dns','unique:users'],
            'phone' => ['required','numeric', 'digits:10', 'unique:users'],
            'password' => ['required',
                'string',
                PasswordValidation::min(8)
                        ->letters()
                        ->mixedCase()
                        ->numbers()
                        ->symbols()
            ],
            'confirm_password' => ['required_with:password','same:password'],
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
        ];
    }

    /**
     * Handle a passed validation attempt.
     *
     * @return void
     */
    protected function prepareForValidation(): void
    {
        $request = Purify::clean($this->all());
        $this->replace([...$request]);
    }

}