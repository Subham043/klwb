<?php

namespace App\Modules\Admins\Accounts\Requests;

use App\Http\Enums\Guards;
use App\Http\Requests\InputRequest;
use App\Http\Services\RateLimitService;
use Illuminate\Support\Facades\Auth;


class ProfilePostRequest extends InputRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize(): bool
    {
        (new RateLimitService($this))->ensureIsNotRateLimited(3);
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
            'name' => 'required|string|max:255',
            'email' => 'required|string|email:rfc,dns|max:255|unique:admins,email,'.Auth::guard(Guards::Admin->value())->user()->id,
            'phone' => ['required','numeric', 'digits:10', 'unique:admins,phone,'.Auth::guard(Guards::Admin->value())->user()->id],
        ];
    }

}
