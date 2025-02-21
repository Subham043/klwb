<?php

namespace App\Modules\Admins\Scholarship\Requests;

use App\Http\Enums\Guards;
use App\Http\Requests\InputRequest;
use Illuminate\Support\Facades\Auth;


class AdminScholarshipInstituteUpdateRequest extends InputRequest
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
            'ins_district_id' => 'required|numeric|exists:cities,id',
            'ins_taluq_id' => 'required|numeric|exists:taluqs,id',
            'school_id' => 'required|numeric|exists:registered_institutes,id',
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
            'ins_district_id' => 'District',
            'ins_taluq_id' => 'Taluq',
            'school_id' => 'Institution',
        ];
    }

}
