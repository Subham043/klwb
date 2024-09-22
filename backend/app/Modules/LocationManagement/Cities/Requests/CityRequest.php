<?php

namespace App\Modules\LocationManagement\Cities\Requests;

use App\Http\Enums\Guards;
use App\Http\Requests\InputRequest;
use Illuminate\Support\Facades\Auth;


class CityRequest extends InputRequest
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
            'state_id' => 'required|numeric|exists:states,id',
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
            'state_id' => 'State',
        ];
    }
}
