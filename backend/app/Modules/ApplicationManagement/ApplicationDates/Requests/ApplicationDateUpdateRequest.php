<?php

namespace App\Modules\ApplicationManagement\ApplicationDates\Requests;


class ApplicationDateUpdateRequest extends ApplicationDateCreateRequest
{

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'application_year' => 'required|numeric|gt:0|gte:'.date("Y").'|unique:application_dates,application_year,'.$this->route('id'),
            'from_date' => ['required', 'date', 'after_or_equal:from_date'],
            'to_date' => ['required', 'date', 'after:from_date'],
            'is_active' => 'required|boolean',
            'can_resubmit' => 'required|boolean',
            'can_approve' => 'required|boolean',
            'can_verify' => 'required|boolean',
        ];
    }

}
