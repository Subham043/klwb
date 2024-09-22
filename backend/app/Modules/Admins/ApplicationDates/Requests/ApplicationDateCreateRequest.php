<?php

namespace App\Modules\Admins\ApplicationDates\Requests;

use App\Http\Enums\Guards;
use App\Http\Requests\InputRequest;
use Illuminate\Support\Facades\Auth;


class ApplicationDateCreateRequest extends InputRequest
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
            'application_year' => 'required|numeric|gt:0|gte:'.date("Y").'|unique:application_dates,application_year',
            'from_date' => ['required', 'date', 'after_or_equal:today'],
            'to_date' => ['required', 'date', 'after:from_date'],
            'can_resubmit' => 'required|boolean',
            'can_approve' => 'required|boolean',
            'can_verify' => 'required|boolean',
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
            'can_resubmit' => 'Can Student Resubmit',
            'can_approve' => 'Can Industry/Institute Approve',
            'can_verify' => 'Can Officials Verify',
        ];
    }

}
