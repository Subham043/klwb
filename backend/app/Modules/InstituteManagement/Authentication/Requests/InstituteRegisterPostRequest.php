<?php

namespace App\Modules\InstituteManagement\Authentication\Requests;

use App\Http\Services\RateLimitService;
use Illuminate\Foundation\Http\FormRequest;
use Stevebauman\Purify\Facades\Purify;
use Illuminate\Validation\Rules\Password as PasswordValidation;


class InstituteRegisterPostRequest extends FormRequest
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
            'email' => ['required','email:rfc,dns','unique:school_auths'],
            'phone' => ['required','numeric', 'digits:10', 'unique:school_auths'],
            'password' => ['required',
                'string',
                PasswordValidation::min(8)
                        ->letters()
                        ->mixedCase()
                        ->numbers()
                        ->symbols()
            ],
            'confirm_password' => ['required_with:password','same:password'],
            'reg_certification' => 'required|file|extensions:jpg,jpeg,png|min:1|max:515',
            'principal_signature' => 'required|file|extensions:jpg,jpeg,png|min:1|max:515',
            'seal' => 'required|file|extensions:jpg,jpeg,png|min:1|max:515',
            'city_id' => 'required|numeric|exists:cities,id',
            'taluq_id' => 'required|numeric|exists:taluqs,id',
            'reg_institute_id' => 'required|numeric|exists:registered_institutes,id|unique:schools',
            'pincode' => 'required|string|max:500',
            'address' => 'required|string|max:500',
            'captcha' => 'required|captcha'
        ];
    }

    public function attributes(): array
    {
        return [
            'city_id' => 'District',
            'reg_institute_id' => 'Institute',
            'name' => 'Principal Name',
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
            'reg_institute_id.unique' => 'Institute already registered.',
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
