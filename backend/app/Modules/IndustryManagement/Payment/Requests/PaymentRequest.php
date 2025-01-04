<?php

namespace App\Modules\IndustryManagement\Payment\Requests;

use App\Http\Enums\Guards;
use App\Http\Requests\InputRequest;
use App\Modules\IndustryManagement\Payment\Models\Payment;
use Illuminate\Support\Facades\Auth;
use App\Modules\Admins\RequestIndustry\Enums\Act;
use Illuminate\Validation\Rules\Enum;

class PaymentRequest extends InputRequest
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

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        $years = Payment::select('year')->with('industry')->whereHas('industry', function ($query) {
			$query->where('id', auth()->guard(Guards::Industry->value())->user()->reg_industry_id);
		})
		->where('comp_regd_id', auth()->guard(Guards::Industry->value())->user()->reg_industry_id)
        ->where('status', 1)
        ->lazy(100)->collect()
		->pluck('year')->toArray();
        return [
            'year' => ['required', 'numeric', function ($attribute, $value, $fail) use($years) {
                if (in_array($value, $years)) {
                    $fail('You have already paid for the selected year.');
                }
            }],
            'male' => ['required', 'numeric', function ($attribute, $value, $fail) {
                if ($value==0 && $this->female==0) {
                    $fail('Male or Female count should be greater than 0.');
                }
            }],
            'female' => ['required', 'numeric', function ($attribute, $value, $fail) {
                if ($value==0 && $this->male==0) {
                    $fail('Male or Female count should be greater than 0.');
                }
            }],
            'category' => 'required|string|max:500',
            'act' => ['required', new Enum(Act::class)],
            'employee_excel' => 'required|file|extensions:xlsx',
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
            'male' => 'Male Count',
            'female' => 'Female Count',
        ];
    }

}
