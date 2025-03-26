<?php

namespace App\Modules\Admins\RegisteredInstitute\Requests;

use App\Http\Enums\Guards;
use App\Http\Requests\InputRequest;
use App\Modules\Admins\Institutes\Enums\UrbanRural;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rules\Enum;


class RegisteredInstituteUpdateRequest extends InputRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize(): bool
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
            'name' => 'required|string|max:500',
            'management_type' => 'nullable|string|max:500',
            'category' => 'nullable|string|max:500',
            'type' => 'nullable|string|max:500',
            'urban_rural' => ['nullable', new Enum(UrbanRural::class)],
            'taluq_id' => 'required|numeric|exists:taluqs,id',
            'principal' => ['required', 'string'],
            'email' => ['required','email:rfc,dns'],
            'phone' => ['required','numeric', 'digits:10'],
            'pincode' => 'required|string|max:500',
            'address' => 'required|string|max:500',
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
            'is_active' => 'Active',
            'taluq_id' => 'Taluq',
            'urban_rural' => 'Urban/Rural',
            'principal' => 'Principal Name',
        ];
    }

}
