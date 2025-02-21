<?php

namespace App\Modules\Admins\Scholarship\Requests;

use App\Http\Enums\Guards;
use App\Http\Requests\InputRequest;
use Illuminate\Support\Facades\Auth;


class AdminScholarshipIndustryUpdateRequest extends InputRequest
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
            'district_id' => 'required|numeric|exists:cities,id',
            'taluq_id' => 'required|numeric|exists:taluqs,id',
            'company_id' => 'required|numeric|exists:registered_industries,id',
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
            'district_id' => 'District',
            'taluq_id' => 'Taluq',
            'company_id' => 'Industry',
        ];
    }

}
