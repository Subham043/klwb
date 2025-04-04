<?php

namespace App\Modules\Admins\RegisteredIndustry\Requests;

use App\Http\Enums\Guards;
use App\Http\Requests\InputRequest;
use App\Modules\Admins\RequestIndustry\Enums\Act;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rules\Enum;


class RegisteredIndustryUpdateRequest extends InputRequest
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
            'act' => ['nullable', new Enum(Act::class)],
            'category' => 'nullable|string|max:500',
            'city_id' => 'required|numeric|exists:cities,id',
            'taluq_id' => 'required|numeric|exists:taluqs,id',
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
            'city_id' => 'District',
            'taluq_id' => 'Taluq',
            'name' => 'Industry Name',
        ];
    }
}
