<?php

namespace App\Modules\Admins\ApplicationDates\Requests;

use App\Modules\Admins\ApplicationDates\Services\ApplicationDateService;
use Illuminate\Validation\Rule;

class ApplicationDateUpdateRequest extends ApplicationDateCreateRequest
{

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        $application_date = (new ApplicationDateService)->getById($this->route('id'));
        $parentRules = parent::rules();
        return array_merge($parentRules, [
            'application_year' => [Rule::requiredIf(!$application_date->has_expired), Rule::prohibitedIf($application_date->has_expired), 'numeric', 'gt:0', 'gte:'.date("Y").'', 'unique:application_dates,application_year,'.$this->route('id')],
            'from_date' => [Rule::requiredIf(!$application_date->has_expired), Rule::prohibitedIf($application_date->has_expired), 'date', 'after_or_equal:from_date'],
            'to_date' => [Rule::requiredIf(!$application_date->has_expired), Rule::prohibitedIf($application_date->has_expired), 'date', 'after:from_date'],
        ]);
    }

}
