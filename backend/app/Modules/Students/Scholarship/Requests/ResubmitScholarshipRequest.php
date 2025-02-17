<?php

namespace App\Modules\Students\Scholarship\Requests;

use App\Http\Enums\Guards;
use App\Modules\Admins\ApplicationDates\Services\ScholarshipApplicationChecksService;
use App\Modules\Students\Scholarship\Enums\NotApplicable;
use App\Modules\Students\Scholarship\Models\ApplicationBasicDetail;
use App\Modules\Students\Scholarship\Services\ScholarshipService;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;
use App\Modules\Students\Scholarship\Requests\ApplyScholarshipRequest;
use Exception;

class ResubmitScholarshipRequest extends ApplyScholarshipRequest
{

    public function __construct(private ScholarshipApplicationChecksService $applicationChecks, private ScholarshipService $scholarshipService)
    {
        parent::__construct($applicationChecks);
    }

    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize(): bool
    {
        $application = $this->scholarshipService->getLatest();
        return Auth::guard(Guards::Web->value())->check() &&  $this->applicationChecks->canResubmit($application);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        $application_date = $this->applicationChecks->getLatestApplicationDate();
        $application = $this->scholarshipService->getLatest();

        $parentRules = parent::rules();

        $rules = [

            'adharcard_no' => ['required','numeric', 'digits:12', 'different:f_adhar', 'different:m_adhar', function ($attribute, $value, $fail) use($application_date, $application) {
                $basic_detail = ApplicationBasicDetail::with('application')->where('adharcard_no', $value)->whereHas('application', function($qry){
                    $qry->applicationIsActive();
                })->latest('id')->first();
                if (!empty($basic_detail) && !empty($basic_detail->application) && $basic_detail->application->application_year == $application_date->application_year && $basic_detail->application->id != $application->id) {
                    $fail('This adhar card number has already been used to apply for scholarship in this year.');
                }
            }],

            'f_adhar' => ['nullable', Rule::requiredIf(empty($this->not_applicable) || (!empty($this->not_applicable) && $this->not_applicable == NotApplicable::Mother->value)), Rule::prohibitedIf((!empty($this->not_applicable) && $this->not_applicable == NotApplicable::Father->value)),'numeric', 'digits:12', 'different:adharcard_no', 'different:m_adhar', function ($attribute, $value, $fail) use($application_date, $application) {
                $basic_detail = ApplicationBasicDetail::with('application')->where('f_adhar', $value)->whereHas('application', function($qry){
                    $qry->applicationIsActive();
                })->latest('id')->first();
                if (!empty($basic_detail) && !empty($basic_detail->application) && $basic_detail->application->application_year == $application_date->application_year && $basic_detail->application->id != $application->id) {
                    $fail('The father\'s adhar card number has already been used to apply for scholarship in this year.');
                }
            }],
            'm_adhar' => ['nullable', Rule::requiredIf(empty($this->not_applicable) || (!empty($this->not_applicable) && $this->not_applicable == NotApplicable::Father->value)), Rule::prohibitedIf((!empty($this->not_applicable) && $this->not_applicable == NotApplicable::Mother->value)),'numeric', 'digits:12', 'different:adharcard_no', 'different:f_adhar', function ($attribute, $value, $fail) use($application_date, $application) {
                $basic_detail = ApplicationBasicDetail::with('application')->where('m_adhar', $value)->whereHas('application', function($qry){
                    $qry->applicationIsActive();
                })->latest('id')->first();
                if (!empty($basic_detail) && !empty($basic_detail->application) && $basic_detail->application->application_year == $application_date->application_year && $basic_detail->application->id != $application->id) {
                    $fail('The mother\'s adhar card number has already been used to apply for scholarship in this year.');
                }
            }],
            
        ];

        if($application && $application->mark->prv_markcard_link){
            $rules['prv_markcard'] = ['nullable', 'file', 'extensions:jpg,jpeg,png,pdf', 'min:1', 'max:515'];
        }else{
            $rules['prv_markcard'] = ['required', 'file', 'extensions:jpg,jpeg,png,pdf', 'min:1', 'max:515'];
        }
        
        if($application && $application->mark->prv_markcard2_link){
            $rules['prv_markcard2'] = ['nullable', 'file', 'extensions:jpg,jpeg,png,pdf', 'min:1', 'max:515'];
        }else{
            $rules['prv_markcard2'] = ['nullable', Rule::requiredIf($this->marks_card_type==false), Rule::prohibitedIf($this->marks_card_type==true), 'file', 'extensions:jpg,jpeg,png,pdf', 'min:1', 'max:515'];
        }
        
        if($application && $application->basic_detail->cast_certificate_link && $this->is_scst==$application->basic_detail->is_scst){
            $rules['cast_certificate'] = ['nullable', 'file', 'extensions:jpg,jpeg,png,pdf', 'min:1', 'max:515'];
        }else{
            $rules['cast_certificate'] = ['nullable', Rule::requiredIf($this->is_scst==true), Rule::prohibitedIf($this->is_scst==false), 'file', 'extensions:jpg,jpeg,png,pdf', 'min:1', 'max:515'];
        }
        
        if($application && $application->basic_detail->f_adharfile_link){
            if(!empty($application->basic_detail->not_applicable) && $application->basic_detail->not_applicable == $this->not_applicable && $application->basic_detail->not_applicable == NotApplicable::Mother->value){
                $rules['f_adharfile'] = ['nullable', 'file', 'extensions:jpg,jpeg,png,pdf', 'min:1', 'max:515'];
            }else{
                $rules['f_adharfile'] = ['nullable', 'file', 'extensions:jpg,jpeg,png,pdf', 'min:1', 'max:515'];
                // $rules['f_adharfile'] = ['nullable', Rule::requiredIf(empty($this->not_applicable) || (!empty($this->not_applicable) && $this->not_applicable == NotApplicable::Mother->value)), Rule::prohibitedIf((!empty($this->not_applicable) && $this->not_applicable == NotApplicable::Father->value)), 'file', 'extensions:jpg,jpeg,png,pdf', 'min:1', 'max:515'];
            }
        }else{
            $rules['f_adharfile'] = ['nullable', Rule::requiredIf(empty($this->not_applicable) || (!empty($this->not_applicable) && $this->not_applicable == NotApplicable::Mother->value)), Rule::prohibitedIf((!empty($this->not_applicable) && $this->not_applicable == NotApplicable::Father->value)), 'file', 'extensions:jpg,jpeg,png,pdf', 'min:1', 'max:515'];
        }
        
        if($application && $application->basic_detail->m_adharfile_link){
            if(!empty($application->basic_detail->not_applicable) && $application->basic_detail->not_applicable == $this->not_applicable && $application->basic_detail->not_applicable == NotApplicable::Father->value){
                $rules['m_adharfile'] = ['nullable', 'file', 'extensions:jpg,jpeg,png,pdf', 'min:1', 'max:515'];
            }else{
                $rules['m_adharfile'] = ['nullable', 'file', 'extensions:jpg,jpeg,png,pdf', 'min:1', 'max:515'];
                // $rules['m_adharfile'] = ['nullable', Rule::requiredIf(empty($this->not_applicable) || (!empty($this->not_applicable) && $this->not_applicable == NotApplicable::Father->value)), Rule::prohibitedIf((!empty($this->not_applicable) && $this->not_applicable == NotApplicable::Mother->value)), 'file', 'extensions:jpg,jpeg,png,pdf', 'min:1', 'max:515'];
            }
        }else{
            $rules['m_adharfile'] = ['nullable', Rule::requiredIf(empty($this->not_applicable) || (!empty($this->not_applicable) && $this->not_applicable == NotApplicable::Father->value)), Rule::prohibitedIf((!empty($this->not_applicable) && $this->not_applicable == NotApplicable::Mother->value)), 'file', 'extensions:jpg,jpeg,png,pdf', 'min:1', 'max:515'];
        }
        
        if($application && $application->basic_detail->deathcertificate_link && $this->not_applicable == $application->basic_detail->not_applicable){
            $rules['deathcertificate'] = ['nullable', 'file', 'extensions:jpg,jpeg,png,pdf', 'min:1', 'max:515'];
        }else{
            $rules['deathcertificate'] = ['nullable', Rule::requiredIf(!empty($this->not_applicable) && ($this->not_applicable == NotApplicable::Mother->value || $this->not_applicable == NotApplicable::Father->value)), Rule::prohibitedIf(empty($this->not_applicable) || (!empty($this->m_adharfile) && !empty($this->f_adharfile))), 'file', 'extensions:jpg,jpeg,png,pdf', 'min:1', 'max:515'];
        }

        if($application && $application->basic_detail->adharcard_file_link){
            $rules['adharcard_file'] = ['nullable', 'file', 'extensions:jpg,jpeg,png,pdf', 'min:1', 'max:515'];
        }else{
            $rules['adharcard_file'] = ['required', 'file', 'extensions:jpg,jpeg,png,pdf', 'min:1', 'max:515'];
        }

        if($application && $application->account->passbook_link){
            $rules['passbook'] = ['nullable', 'file', 'extensions:jpg,jpeg,png,pdf', 'min:1', 'max:515'];
        }else{
            $rules['passbook'] = ['required', 'file', 'extensions:jpg,jpeg,png,pdf', 'min:1', 'max:515'];
        }

        if($application && $application->company->salaryslip_link){
            $rules['salaryslip'] = ['nullable', 'file', 'extensions:jpg,jpeg,png,pdf', 'min:1', 'max:515'];
        }else{
            $rules['salaryslip'] = ['required', 'file', 'extensions:jpg,jpeg,png,pdf', 'min:1', 'max:515'];
        }

        return array_merge($parentRules, $rules);
    }
}
