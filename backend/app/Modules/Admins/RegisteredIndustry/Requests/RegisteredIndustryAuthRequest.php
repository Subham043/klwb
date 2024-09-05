<?php

namespace App\Modules\Admins\RegisteredIndustry\Requests;

use App\Http\Enums\Guards;
use App\Http\Requests\InputRequest;
use Illuminate\Support\Facades\Auth;


class RegisteredIndustryAuthRequest extends InputRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize(): bool
    {
        return Auth::guard(Guards::Admin->value())->check();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'name' => 'required|string|max:500',
            'email' => ['required','email:rfc,dns','unique:industry_auths,email,'.$this->route('id')],
            'phone' => ['required','numeric', 'digits:10','unique:industry_auths,phone,'.$this->route('id')],
            'is_blocked' => 'required|boolean',
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
            'name' => 'Director Name',
        ];
    }

}
