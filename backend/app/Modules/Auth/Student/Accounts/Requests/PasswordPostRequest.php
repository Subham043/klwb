<?php

namespace App\Modules\Auth\Student\Accounts\Requests;

use App\Http\Enums\Guards;
use App\Http\Requests\InputRequest;
use App\Http\Services\RateLimitService;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;

class PasswordPostRequest extends InputRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        (new RateLimitService($this))->ensureIsNotRateLimited(3);
        return Auth::guard(Guards::Web->value())->check();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
     */
    public function rules(): array
    {
        return [
            'old_password' => ['required','string', function ($attribute, $value, $fail) {
                if (!Hash::check($value, Auth::guard(Guards::Web->value())->user()->password)) {
                    $fail('The '.$attribute.' entered is incorrect.');
                }
            }],
            'password' => ['required',
                'string',
                Password::min(8)
                        ->letters()
                        ->mixedCase()
                        ->numbers()
                        ->symbols()
            ],
            'confirm_password' => 'string|min:6|required_with:password|same:password',
        ];
    }

}
