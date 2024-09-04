<?php

namespace App\Modules\Auth\Institute\Accounts\Requests;

use App\Http\Enums\Guards;
use App\Http\Requests\InputRequest;
use App\Http\Services\RateLimitService;
use App\Modules\Roles\Enums\Roles;
use Illuminate\Support\Facades\Auth;


class AccountInfoPostRequest extends InputRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize(): bool
    {
        (new RateLimitService($this))->ensureIsNotRateLimited(3);
        return Auth::guard(Guards::Institute->value())->check() && Auth::guard(Guards::Institute->value())->user()->current_role == Roles::Institute->value;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'principal' => ['required', 'string'],
            'email' => ['required','email:rfc,dns'],
            'phone' => ['required','numeric', 'digits:10'],
            'address' => 'required|string|max:500',
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
            'principal' => 'Principal Name',
        ];
    }

}
