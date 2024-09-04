<?php

namespace App\Modules\InstituteManagement\Institutes\Requests;

use App\Http\Enums\Guards;
use App\Http\Requests\InputRequest;
use App\Modules\InstituteManagement\RegisteredInstitutes\Enums\UrbanRural;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rules\Enum;


class RegisteredUpdateRequest extends InputRequest
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
            'management_type' => 'required|string|max:500',
            'category' => 'required|string|max:500',
            'type' => 'required|string|max:500',
            'urban_rural' => ['required', new Enum(UrbanRural::class)],
            'taluq_id' => 'required|numeric|exists:taluqs,id',
            'principal' => ['required', 'string'],
            'email' => ['required','email:rfc,dns'],
            'phone' => ['required','numeric', 'digits:10'],
            'pincode' => 'required|string|max:500',
            'address' => 'required|string|max:500',
            'is_active' => 'required|boolean',
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
