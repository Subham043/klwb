<?php

namespace App\Modules\Admins\Employees\Requests;

use App\Http\Enums\Guards;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Stevebauman\Purify\Facades\Purify;
use Illuminate\Validation\Rules\Password;


class EmployeeCreatePostRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
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
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:admins',
            'phone' => 'required|numeric|digits:10|unique:admins',
            'role' => 'required|string|exists:Spatie\Permission\Models\Role,name',
            'is_blocked' => 'required|boolean',
            'password_confirmation' => 'string|min:8|required_with:password|same:password',
            'password' => ['required',
                'string',
                Password::min(8)
                        ->letters()
                        ->mixedCase()
                        ->numbers()
                        ->symbols()
            ],
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
            'is_blocked' => 'Blocked',
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
