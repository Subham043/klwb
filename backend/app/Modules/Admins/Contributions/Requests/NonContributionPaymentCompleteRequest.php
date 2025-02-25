<?php

namespace App\Modules\Admins\Contributions\Requests;

use App\Http\Enums\Guards;
use App\Http\Requests\InputRequest;
use App\Modules\IndustryManagement\Payment\Models\Payment;
use Illuminate\Support\Facades\Auth;


class NonContributionPaymentCompleteRequest extends InputRequest
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
        $years = Payment::select('year')->with('industry')->whereHas('industry', function ($query) {
			$query->where('id', $this->route('comp_regd_id'));
		})
		->where('comp_regd_id', $this->route('comp_regd_id'))
        ->where('status', 1)
        ->lazy(100)->collect()
		->pluck('year')->toArray();
        return [
            'year' => ['required', 'numeric', function ($attribute, $value, $fail) use($years) {
                if (in_array($value, $years)) {
                    $fail('This industry has already paid for the selected year.');
                }
            }],
        ];
    }

}
