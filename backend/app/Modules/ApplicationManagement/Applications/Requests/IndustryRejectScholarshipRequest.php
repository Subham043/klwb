<?php

namespace App\Modules\ApplicationManagement\Applications\Requests;

use App\Http\Enums\Guards;
use Illuminate\Support\Facades\Auth;


class IndustryRejectScholarshipRequest extends InstituteRejectScholarshipRequest
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

}
