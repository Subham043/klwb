<?php

namespace App\Modules\ApplicationManagement\Applications\Requests;

use App\Http\Enums\Guards;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;
use Stevebauman\Purify\Facades\Purify;


class IndustryApproveScholarshipRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return Auth::guard(Guards::Industry->value())->check();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'mode_industry' => ['required', 'boolean'],
            'reference_industry' => ['nullable', Rule::requiredIf($this->mode_industry==true), Rule::prohibitedIf($this->mode_industry==false), 'string', 'max:250'],
            'dd_industry' => ['nullable', Rule::requiredIf($this->mode_industry==false), Rule::prohibitedIf($this->mode_industry==true), 'string', 'max:250'],
            'amount_industry' => ['nullable', Rule::requiredIf($this->mode_industry==false), Rule::prohibitedIf($this->mode_industry==true), 'numeric'],
            'date_offline_industry' => ['nullable', Rule::requiredIf($this->mode_industry==false), Rule::prohibitedIf($this->mode_industry==true), 'date'],
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
            'mode_industry' => 'Is Mode Online',
            'reference_industry' => 'Reference Number',
            'dd_industry' => 'Cheque/DD Number',
            'amount_industry' => 'Amount',
            'date_offline_industry' => 'Date',
        ];
    }

    protected function prepareForValidation(): void
    {
        $request = Purify::clean($this->all());
        $this->replace([...$request]);
    }
}
