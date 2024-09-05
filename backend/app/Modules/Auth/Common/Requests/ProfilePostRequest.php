<?php

namespace App\Modules\Auth\Common\Requests;

use App\Http\Requests\InputRequest;
use App\Http\Services\RateLimitService;


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
            'name' => 'required|string|max:255',
            'email' => 'required|string|email:rfc,dns|max:255|unique:users,email,'. $this->user()->id,
            'phone' => ['required','numeric', 'digits:10', 'unique:users,phone,'. $this->user()->id],
        ];
    }

}