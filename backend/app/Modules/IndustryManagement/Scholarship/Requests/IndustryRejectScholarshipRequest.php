<?php

namespace App\Modules\IndustryManagement\Scholarship\Requests;

use App\Http\Enums\Guards;
use App\Modules\InstituteManagement\Scholarship\Requests\InstituteRejectScholarshipRequest;
use Illuminate\Support\Facades\Auth;


class IndustryRejectScholarshipRequest extends InstituteRejectScholarshipRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize(): bool
    {
        return Auth::guard(Guards::Industry->value())->check();
    }

}
