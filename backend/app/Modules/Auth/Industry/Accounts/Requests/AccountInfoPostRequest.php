<?php

namespace App\Modules\Auth\Industry\Accounts\Requests;

use App\Http\Enums\Guards;
use App\Http\Requests\InputRequest;
use App\Http\Services\RateLimitService;
use App\Modules\Admins\RequestIndustry\Enums\Act;
use App\Modules\Roles\Enums\Roles;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rules\Enum;


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
            'category' => 'required|string|max:500',
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
