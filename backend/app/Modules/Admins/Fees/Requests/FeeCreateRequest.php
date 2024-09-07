<?php

namespace App\Modules\Admins\Fees\Requests;

use App\Http\Enums\Guards;
use App\Http\Requests\InputRequest;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Auth;


class FeeCreateRequest extends InputRequest
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
            'amount' => 'required|numeric|gt:0',
            'graduation_id' => ['required','numeric','exists:graduations,id', Rule::unique('fees', 'graduation_id', 'year')],
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
            'graduation_id' => 'Class',
        ];
    }

    /**
     * Get the error messages for the defined validation rules.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'graduation_id.unique' => 'Fee for this graduation for the year '.date('Y').' already exists.',
        ];
    }

}
