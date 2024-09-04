<?php

namespace App\Modules\Auth\Official\Authentication\Requests;

use App\Http\Requests\InputRequest;
use App\Modules\Admins\Employees\Models\Employee;
use Illuminate\Auth\Events\Verified;
use Illuminate\Validation\Validator;

class EmailVerificationRequest extends InputRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize(): bool
    {
        $user = Employee::findOrFail($this->route('id'));

        if (! hash_equals((string) $user->getKey(), (string) $this->route('id'))) {
            return false;
        }

        if (! hash_equals(sha1($user->getEmailForVerification()), (string) $this->route('hash'))) {
            return false;
        }

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
            //
        ];
    }

    /**
     * Fulfill the email verification request.
     *
     * @return void
     */
    public function fulfill()
    {
        $user = Employee::findOrFail($this->route('id'));

        if (! $user->hasVerifiedEmail()) {
            $user->markEmailAsVerified();

            event(new Verified($user));
        }
    }

    /**
     * Configure the validator instance.
     *
     * @param  \Illuminate\Validation\Validator  $validator
     * @return void
     */
    public function withValidator(Validator $validator)
    {
        return $validator;
    }
}
