<?php

namespace App\Modules\InstituteManagement\Accounts\Requests;

use App\Http\Enums\Guards;
use App\Http\Services\RateLimitService;
use App\Modules\Roles\Enums\Roles;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Stevebauman\Purify\Facades\Purify;


class AccountDocPatchRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
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
            'reg_certification' => 'nullable|file|extensions:jpg,jpeg,png|min:1|max:515',
            'principal_signature' => 'nullable|file|extensions:jpg,jpeg,png|min:1|max:515',
            'seal' => 'nullable|file|extensions:jpg,jpeg,png|min:1|max:515',
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
