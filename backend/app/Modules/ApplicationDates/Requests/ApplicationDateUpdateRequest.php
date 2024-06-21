<?php

namespace App\Modules\ApplicationDates\Requests;


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
            'from_date' => ['required', 'date', 'after_or_equal:today'],
            'to_date' => ['required', 'date', 'after:from_date'],
            'approval_end_date' => ['required', 'date', 'after:from_date', 'after:to_date'],
            'verification_end_date' => ['required', 'date', 'after:from_date', 'after:to_date', 'after:approval_end_date'],
            'is_active' => 'required|boolean',
        ];
    }

}