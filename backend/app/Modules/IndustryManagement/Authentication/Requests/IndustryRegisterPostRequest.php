<?php

namespace App\Modules\IndustryManagement\Authentication\Requests;

use App\Http\Services\RateLimitService;
use App\Modules\IndustryManagement\RequestIndustry\Enums\Act;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Enum;
use Stevebauman\Purify\Facades\Purify;
use Illuminate\Validation\Rules\Password as PasswordValidation;


class IndustryRegisterPostRequest extends FormRequest
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
            'email' => ['required','email:rfc,dns','unique:industry_auths'],
            'phone' => ['required','numeric', 'digits:10', 'unique:industry_auths'],
            'password' => ['required',
                'string',
                PasswordValidation::min(8)
                        ->letters()
                        ->mixedCase()
                        ->numbers()
                        ->symbols()
            ],
            'confirm_password' => ['required_with:password','same:password'],
            'register_doc' => 'required|file|extensions:jpg,jpeg,png|min:1|max:515',
            'sign' => 'required|file|extensions:jpg,jpeg,png|min:1|max:515',
            'seal' => 'required|file|extensions:jpg,jpeg,png|min:1|max:515',
            'city_id' => 'required|numeric|exists:cities,id',
            'taluq_id' => 'required|numeric|exists:taluqs,id',
            'reg_industry_id' => 'required|numeric|exists:registered_industries,id|unique:industry_auths',
            'address' => 'required|string|max:500',
            'act' => ['required', new Enum (Act::class)],
            'captcha' => 'required|captcha'
        ];
    }

    public function attributes(): array
    {
        return [
            'city_id' => 'District',
            'reg_industry_id' => 'Industry',
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
            'reg_industry_id.unique' => 'Industry already registered.',
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
