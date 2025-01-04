<?php

namespace App\Modules\Admins\Industries\Requests;

use App\Http\Enums\Guards;
use App\Http\Requests\InputRequest;
use App\Modules\Admins\RequestIndustry\Enums\Act;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rules\Enum;


class IndustryRequest extends InputRequest
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
            'act' => ['required', new Enum(Act::class)],
            'category' => 'required|string|max:500',
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
        ];
    }

}
