<?php

namespace App\Modules\IndustryManagement\Accounts\Requests;

use App\Http\Enums\Guards;
use App\Http\Services\RateLimitService;
use App\Modules\IndustryManagement\RequestIndustry\Enums\Act;
use App\Modules\Roles\Enums\Roles;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rules\Enum;
use Stevebauman\Purify\Facades\Purify;


class AccountInfoPostRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
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
            'gst_no' => ['required', 'string', 'max:250'],
            'pan_no' => ['required', 'string', 'max:250'],
            'address' => 'required|string|max:500',
            'pincode' => 'required|string|max:250',
            'act' => ['required', new Enum(Act::class)],
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
