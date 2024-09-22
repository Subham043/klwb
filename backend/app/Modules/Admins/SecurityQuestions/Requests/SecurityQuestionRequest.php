<?php

namespace App\Modules\Admins\SecurityQuestions\Requests;

use App\Http\Enums\Guards;
use App\Http\Requests\InputRequest;
use Illuminate\Support\Facades\Auth;


class SecurityQuestionRequest extends InputRequest
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
            'question' => 'required|string',
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
