<?php

namespace App\Modules\Auth\Industry\Accounts\Requests;

use App\Http\Enums\Guards;
use App\Http\Requests\InputRequest;
use App\Http\Services\RateLimitService;
use App\Modules\Roles\Enums\Roles;
use Illuminate\Support\Facades\Auth;


class AccountDocPatchRequest extends InputRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize(): bool
    {
        (new RateLimitService($this))->ensureIsNotRateLimited(3);
        return Auth::guard(Guards::Industry->value())->check() && Auth::guard(Guards::Industry->value())->user()->current_role == Roles::Industry->value;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'reg_doc' => 'nullable|file|extensions:jpg,jpeg,png|min:1|max:515',
            'sign' => 'nullable|file|extensions:jpg,jpeg,png|min:1|max:515',
            'seal' => 'nullable|file|extensions:jpg,jpeg,png|min:1|max:515',
            'gst' => 'nullable|file|extensions:jpg,jpeg,png|min:1|max:515',
            'pan' => 'nullable|file|extensions:jpg,jpeg,png|min:1|max:515',
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
