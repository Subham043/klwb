<?php

namespace App\Modules\Auth\Industry\Authentication\Requests;

use App\Http\Requests\InputRequest;
use App\Http\Services\RateLimitService;
use App\Modules\Admins\RequestIndustry\Enums\Act;
use Illuminate\Validation\Rules\Enum;
use Illuminate\Validation\Rules\Password as PasswordValidation;


class IndustryRegisterPostRequest extends InputRequest
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
            'name' => ['required', 'string'],
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
            'reg_doc' => 'required|file|extensions:jpg,jpeg,png|min:1|max:515',
            'sign' => 'required|file|extensions:jpg,jpeg,png|min:1|max:515',
            'seal' => 'required|file|extensions:jpg,jpeg,png|min:1|max:515',
            'city_id' => 'required|numeric|exists:cities,id',
            'taluq_id' => 'required|numeric|exists:taluqs,id',
            'reg_industry_id' => 'required|numeric|exists:registered_industries,id|unique:industry_auths',
            'address' => 'required|string|max:500',
            'category' => 'required|string|max:500',
            'act' => ['required', new Enum(Act::class)],
            // 'captcha' => 'required|captcha'
        ];
    }

    public function attributes(): array
    {
        return [
            'city_id' => 'District',
            'reg_industry_id' => 'Industry',
            'name' => 'Director Name',
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

}
