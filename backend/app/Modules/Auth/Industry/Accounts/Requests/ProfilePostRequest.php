<?php

namespace App\Modules\Auth\Industry\Accounts\Requests;

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
        return Auth::guard(Guards::Industry->value())->check();
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
            'email' => 'required|string|email:rfc,dns|max:255|unique:industry_auths,email,'.Auth::guard(Guards::Industry->value())->user()->id,
            'phone' => ['required','numeric', 'digits:10', 'unique:industry_auths,phone,'.Auth::guard(Guards::Industry->value())->user()->id],
        ];
    }

}
