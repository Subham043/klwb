<?php

namespace App\Modules\Students\Scholarship\Requests;

use App\Http\Enums\Guards;
use App\Http\Requests\InputRequest;
use App\Modules\Admins\ApplicationDates\Services\ApplicationDateService;
use App\Modules\Students\Scholarship\Enums\AccountType;
use App\Modules\Students\Scholarship\Enums\Category;
use App\Modules\Students\Scholarship\Enums\Gender;
use App\Modules\Students\Scholarship\Enums\NotApplicable;
use App\Modules\Students\Scholarship\Enums\Working;
use App\Modules\Students\Scholarship\Models\ApplicationBasicDetail;
use App\Modules\Students\Scholarship\Services\ScholarshipService;
use App\Modules\CourseManagement\Classes\Models\Classes;
use App\Modules\CourseManagement\Courses\Models\Course;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rules\Enum;
use Illuminate\Validation\Rule;


class ResubmitScholarshipRequest extends InputRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize(): bool
    {
        $can_resubmit = false;
        $application = (new ScholarshipService)->getLatest();
        if(!(new ScholarshipService)->isEligibleForScholarship()){
            $can_resubmit = (new ScholarshipService)->canResubmit($application);
        }
        return Auth::guard(Guards::Web->value())->check() && $can_resubmit;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        $application_date = (new ApplicationDateService)->getLatest();
        $application = (new ScholarshipService)->getLatest();

        $rules = [
            'name' => ['required', 'string', 'max:250'],
            'father_name' => ['required', 'string', 'max:250'],
            'mother_name' => ['required', 'string', 'max:250'],
            'parent_phone' => ['required','numeric', 'digits:10'],
            'address' => ['required', 'string'],
            'gender' => ['required', new Enum(Gender::class)],
            
            'graduation_id' => 'required|numeric|exists:graduations,id',
            'course_id' => ['nullable', Rule::requiredIf(function(){
                return Course::whenNotAdmin()->where('graduation_id', $this->graduation_id)->count() > 0;
            }), Rule::prohibitedIf(function(){
                return Course::whenNotAdmin()->where('graduation_id', $this->graduation_id)->count() < 1;
            }), 'exists:courses,id'],
            'class_id' => ['nullable', Rule::requiredIf(function(){
                return Classes::whenNotAdmin()->where('course_id', $this->course_id)->count() > 0;
            }), Rule::prohibitedIf(function(){
                return Classes::whenNotAdmin()->where('course_id', $this->course_id)->count() < 1;
            }), 'exists:classes,id'],
            'ins_pin' => ['required','numeric', 'digits:6'],
            'ins_district_id' => 'required|numeric|exists:cities,id',
            'ins_taluq_id' => 'required|numeric|exists:taluqs,id',
            'school_id' => 'required|numeric|exists:registered_institutes,id',
            'prv_class' => ['required', 'string', 'max:250'],
            'prv_marks' => ['required', 'numeric', 'min:0', 'max:999'],
            'marks_card_type' => 'required|boolean',

            'is_scst' => 'required|boolean',
            'cast_no' => ['nullable', Rule::requiredIf($this->is_scst==true), Rule::prohibitedIf($this->is_scst==false), 'string', 'max:250'],
            'category' => ['required', new Enum(Category::class)],

            'adharcard_no' => ['required','numeric', 'digits:12', 'different:f_adhar', 'different:m_adhar', function ($attribute, $value, $fail) use($application_date, $application) {
                $basic_detail = ApplicationBasicDetail::with('application')->where('adharcard_no', $value)->whereHas('application')->latest()->first();
                if (!empty($basic_detail) && !empty($basic_detail->application) && $basic_detail->application->application_year == $application_date->application_year && $basic_detail->application->id != $application->id) {
                    $fail('This adhar card number has already been used to apply for scholarship in this year.');
                }
            }],

            'not_applicable' => ['nullable', new Enum(NotApplicable::class)],
            'f_adhar' => ['nullable', Rule::requiredIf(empty($this->not_applicable) || (!empty($this->not_applicable) && $this->not_applicable == NotApplicable::Mother->value)), Rule::prohibitedIf((!empty($this->not_applicable) && $this->not_applicable == NotApplicable::Father->value)),'numeric', 'digits:12', 'different:adharcard_no', 'different:m_adhar', function ($attribute, $value, $fail) use($application_date, $application) {
                $basic_detail = ApplicationBasicDetail::with('application')->where('f_adhar', $value)->whereHas('application')->latest()->first();
                if (!empty($basic_detail) && !empty($basic_detail->application) && $basic_detail->application->application_year == $application_date->application_year && $basic_detail->application->id != $application->id) {
                    $fail('The father\'s adhar card number has already been used to apply for scholarship in this year.');
                }
            }],
            'm_adhar' => ['nullable', Rule::requiredIf(empty($this->not_applicable) || (!empty($this->not_applicable) && $this->not_applicable == NotApplicable::Father->value)), Rule::prohibitedIf((!empty($this->not_applicable) && $this->not_applicable == NotApplicable::Mother->value)),'numeric', 'digits:12', 'different:adharcard_no', 'different:f_adhar', function ($attribute, $value, $fail) use($application_date, $application) {
                $basic_detail = ApplicationBasicDetail::with('application')->where('m_adhar', $value)->whereHas('application')->latest()->first();
                if (!empty($basic_detail) && !empty($basic_detail->application) && $basic_detail->application->application_year == $application_date->application_year && $basic_detail->application->id != $application->id) {
                    $fail('The mother\'s adhar card number has already been used to apply for scholarship in this year.');
                }
            }],

            'type' => ['required', new Enum(AccountType::class)],
            'bank_name' => ['required', 'string', 'max:250'],
            'branch' => ['required', 'string', 'max:250'],
            'ifsc' => ['required', 'string', 'max:250'],
            'acc_no' => ['required','numeric'],
            'holder' => ['required', 'string', 'max:250'],
            
            'who_working' => ['required', new Enum(Working::class)],
            'parent_guardian_name' => ['required', 'string', 'max:250'],
            'relationship' => ['required', 'string', 'max:250'],
            'msalary' => ['required','numeric', 'lte: 30000'],
            'pincode' => ['required','numeric', 'digits:6'],
            'district_id' => 'required|numeric|exists:cities,id',
            'taluq_id' => 'required|numeric|exists:taluqs,id',
            'company_id' => 'required|numeric|exists:registered_industries,id',
        ];

        if($application && $application->mark->prv_markcard){
            $rules['prv_markcard'] = ['nullable', 'file', 'extensions:jpg,jpeg,png,pdf', 'min:1', 'max:515'];
        }else{
            $rules['prv_markcard'] = ['required', 'file', 'extensions:jpg,jpeg,png,pdf', 'min:1', 'max:515'];
        }
        
        if($application && $application->mark->prv_markcard2){
            $rules['prv_markcard2'] = ['nullable', 'file', 'extensions:jpg,jpeg,png,pdf', 'min:1', 'max:515'];
        }else{
            $rules['prv_markcard2'] = ['nullable', Rule::requiredIf($this->marks_card_type==false), Rule::prohibitedIf($this->marks_card_type==true), 'file', 'extensions:jpg,jpeg,png,pdf', 'min:1', 'max:515'];
        }
        
        if($application && $application->basic_detail->cast_certificate && $this->is_scst==$application->basic_detail->is_scst){
            $rules['cast_certificate'] = ['nullable', 'file', 'extensions:jpg,jpeg,png,pdf', 'min:1', 'max:515'];
        }else{
            $rules['cast_certificate'] = ['nullable', Rule::requiredIf($this->is_scst==true), Rule::prohibitedIf($this->is_scst==false), 'file', 'extensions:jpg,jpeg,png,pdf', 'min:1', 'max:515'];
        }
        
        if($application && $application->basic_detail->f_adharfile){
            if(!empty($application->basic_detail->not_applicable) && $application->basic_detail->not_applicable == $this->not_applicable && $application->basic_detail->not_applicable == NotApplicable::Mother->value){
                $rules['f_adharfile'] = ['nullable', 'file', 'extensions:jpg,jpeg,png,pdf', 'min:1', 'max:515'];
            }else{
                $rules['f_adharfile'] = ['nullable', Rule::requiredIf(empty($this->not_applicable) || (!empty($this->not_applicable) && $this->not_applicable == NotApplicable::Mother->value)), Rule::prohibitedIf((!empty($this->not_applicable) && $this->not_applicable == NotApplicable::Father->value)), 'file', 'extensions:jpg,jpeg,png,pdf', 'min:1', 'max:515'];
            }
        }else{
            $rules['f_adharfile'] = ['nullable', Rule::requiredIf(empty($this->not_applicable) || (!empty($this->not_applicable) && $this->not_applicable == NotApplicable::Mother->value)), Rule::prohibitedIf((!empty($this->not_applicable) && $this->not_applicable == NotApplicable::Father->value)), 'file', 'extensions:jpg,jpeg,png,pdf', 'min:1', 'max:515'];
        }
        
        if($application && $application->basic_detail->m_adharfile){
            if(!empty($application->basic_detail->not_applicable) && $application->basic_detail->not_applicable == $this->not_applicable && $application->basic_detail->not_applicable == NotApplicable::Father->value){
                $rules['m_adharfile'] = ['nullable', 'file', 'extensions:jpg,jpeg,png,pdf', 'min:1', 'max:515'];
            }else{
                $rules['m_adharfile'] = ['nullable', Rule::requiredIf(empty($this->not_applicable) || (!empty($this->not_applicable) && $this->not_applicable == NotApplicable::Father->value)), Rule::prohibitedIf((!empty($this->not_applicable) && $this->not_applicable == NotApplicable::Mother->value)), 'file', 'extensions:jpg,jpeg,png,pdf', 'min:1', 'max:515'];
            }
        }else{
            $rules['m_adharfile'] = ['nullable', Rule::requiredIf(empty($this->not_applicable) || (!empty($this->not_applicable) && $this->not_applicable == NotApplicable::Father->value)), Rule::prohibitedIf((!empty($this->not_applicable) && $this->not_applicable == NotApplicable::Mother->value)), 'file', 'extensions:jpg,jpeg,png,pdf', 'min:1', 'max:515'];
        }
        
        if($application && $application->basic_detail->deathcertificate && $this->not_applicable == $application->basic_detail->not_applicable){
            $rules['deathcertificate'] = ['nullable', 'file', 'extensions:jpg,jpeg,png,pdf', 'min:1', 'max:515'];
        }else{
            $rules['deathcertificate'] = ['nullable', Rule::requiredIf(!empty($this->not_applicable) && ($this->not_applicable == NotApplicable::Mother->value || $this->not_applicable == NotApplicable::Father->value)), Rule::prohibitedIf(empty($this->not_applicable) || (!empty($this->m_adharfile) && !empty($this->f_adharfile))), 'file', 'extensions:jpg,jpeg,png,pdf', 'min:1', 'max:515'];
        }

        if($application && $application->basic_detail->adharcard_file){
            $rules['adharcard_file'] = ['nullable', 'file', 'extensions:jpg,jpeg,png,pdf', 'min:1', 'max:515'];
        }else{
            $rules['adharcard_file'] = ['required', 'file', 'extensions:jpg,jpeg,png,pdf', 'min:1', 'max:515'];
        }

        if($application && $application->account->passbook){
            $rules['passbook'] = ['nullable', 'file', 'extensions:jpg,jpeg,png,pdf', 'min:1', 'max:515'];
        }else{
            $rules['passbook'] = ['required', 'file', 'extensions:jpg,jpeg,png,pdf', 'min:1', 'max:515'];
        }

        if($application && $application->company->salaryslip){
            $rules['salaryslip'] = ['nullable', 'file', 'extensions:jpg,jpeg,png,pdf', 'min:1', 'max:515'];
        }else{
            $rules['salaryslip'] = ['required', 'file', 'extensions:jpg,jpeg,png,pdf', 'min:1', 'max:515'];
        }
        return $rules;
    }

    /**
     * Get custom attributes for validator errors.
     *
     * @return array<string, string>
     */
    public function attributes(): array
    {
        return [
            'name' => 'Student name',
            'graduation_id' => 'Graduation',
            'course_id' => 'Course',
            'class_id' => 'Class',
            'ins_pin' => 'Pincode',
            'ins_district_id' => 'District',
            'ins_taluq_id' => 'Taluq',
            'school_id' => 'Present institution',
            'prv_class' => 'Previous year class',
            'prv_marks' => 'Previous year marks in percentage',
            'marks_card_type' => 'Marks card type',
            'prv_markcard' => 'Previous year marks card',
            'prv_markcard2' => 'Previous year marks card',
            'adharcard_no' => 'Adhar card number',
            'adharcard_file' => 'Adhar card file',
            'deathcertificate' => 'Death certificate file',
            'f_adhar' => 'Father\'s Adhar card number',
            'f_adharfile' => 'Father\'s Adhar card file',
            'm_adhar' => 'Mother\'s Adhar card number',
            'm_adharfile' => 'Mother\'s Adhar card file',
            'type' => 'Account belongs to',
            'bank_name' => 'Bank name',
            'branch' => 'Branch name',
            'ifsc' => 'IFSC code',
            'acc_no' => 'Bank Account number',
            'holder' => 'Account holder name',
            'passbook' => 'Passbook Front page',
            'who_working' => 'Who is working',
            'parent_guardian_name' => 'Parent/Guardian name',
            'msalary' => 'Monthly salary',
            'pincode' => 'Pincode',
            'district_id' => 'District',
            'taluq_id' => 'Taluq',
            'company_id' => 'Parent Industry',
            'salaryslip' => 'Salary slip',
        ];
    }
}
