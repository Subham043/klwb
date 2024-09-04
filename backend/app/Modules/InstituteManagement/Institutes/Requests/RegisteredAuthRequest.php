<?php

namespace App\Modules\InstituteManagement\Institutes\Requests;

use App\Http\Enums\Guards;
use App\Http\Requests\InputRequest;
use App\Modules\InstituteManagement\Institutes\Services\InstituteRegisteredService;
use Illuminate\Support\Facades\Auth;


class RegisteredAuthRequest extends InputRequest
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
        $institute = (new InstituteRegisteredService)->getById($this->route('id'));
        return [
            'name' => 'required|string|max:500',
            'email' => ['required','email:rfc,dns','unique:school_auths,email,'.$institute->profile->id],
            'phone' => ['required','numeric', 'digits:10','unique:school_auths,phone,'.$institute->profile->id],
            'is_blocked' => 'required|boolean',
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
