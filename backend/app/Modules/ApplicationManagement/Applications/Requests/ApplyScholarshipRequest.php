<?php

namespace App\Modules\ApplicationManagement\Applications\Requests;

use App\Http\Enums\Guards;
use App\Modules\ApplicationManagement\Applications\Enums\AccountType;
use App\Modules\ApplicationManagement\Applications\Enums\Category;
use App\Modules\ApplicationManagement\Applications\Enums\Gender;
use App\Modules\ApplicationManagement\Applications\Enums\NotApplicable;
use App\Modules\ApplicationManagement\Applications\Enums\Working;
use App\Modules\ApplicationManagement\Applications\Models\ApplicationBasicDetail;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rules\Enum;
use Stevebauman\Purify\Facades\Purify;
use Illuminate\Validation\Rule;


class ApplyScholarshipRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return Auth::guard(Guards::Web->value())->check();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'name' => ['required', 'string'],
            'father_name' => ['required', 'string'],
            'mother_name' => ['required', 'string'],
            'parent_phone' => ['required','numeric', 'digits:10'],
            'address' => ['required', 'string'],
            'gender' => ['required', new Enum(Gender::class)],
            
            'graduation_id' => 'required|numeric|exists:graduations,id',
            'course_id' => 'required|numeric|exists:courses,id',
            'class_id' => 'required|numeric|exists:classes,id',
            'ins_pin' => ['required','numeric', 'digits:6'],
            'ins_district_id' => 'required|numeric|exists:cities,id',
            'ins_taluq_id' => 'required|numeric|exists:taluqs,id',
            'school_id' => 'required|numeric|exists:registered_institutes,id',
            'prv_class' => ['required', 'string'],
            'prv_marks' => ['required', 'numeric'],
            'marks_card_type' => 'required|boolean',
            'prv_markcard' => 'required|file|extensions:jpg,jpeg,png|min:1|max:515',
            'prv_markcard2' =>  ['nullable', Rule::requiredIf($this->marks_card_type==false), 'file', 'extensions:jpg,jpeg,png', 'min:1', 'max:515'],
            
            'is_scst' => 'required|boolean',
            'cast_no' => ['nullable', Rule::requiredIf($this->is_scst==true), 'string'],
            'cast_certificate' => ['nullable', Rule::requiredIf($this->is_scst==true), 'file', 'extensions:jpg,jpeg,png', 'min:1', 'max:515'],
            'category' => ['required', new Enum(Category::class)],
            
            'adharcard_no' => ['required','numeric', 'digits:12', function ($attribute, $value, $fail) {
                $basic_detail = ApplicationBasicDetail::with('application')->where('adharcard_no', $value)->whereHas('application')->first();
                if (!empty($basic_detail) && !empty($basic_detail->application) && $basic_detail->application->application_year == date('Y')) {
                    $fail('The '.$attribute.' has already been used to apply for scholarship in this year.');
                }
            }],
            'adharcard_file' => 'required|file|extensions:jpg,jpeg,png|min:1|max:515',
            'not_applicable' => ['nullable', new Enum(NotApplicable::class)],
            'deathcertificate' => ['nullable', Rule::requiredIf(!empty($this->not_applicable) && ($this->not_applicable == NotApplicable::Mother->value || $this->not_applicable == NotApplicable::Father->value)), 'file', 'extensions:jpg,jpeg,png', 'min:1', 'max:515'],
            'f_adhar' => ['nullable', Rule::requiredIf(empty($this->not_applicable) || (!empty($this->not_applicable) && $this->not_applicable == NotApplicable::Mother->value)),'numeric', 'digits:12', function ($attribute, $value, $fail) {
                $basic_detail = ApplicationBasicDetail::with('application')->where('f_adhar', $value)->whereHas('application')->first();
                if (!empty($basic_detail) && !empty($basic_detail->application) && $basic_detail->application->application_year == date('Y')) {
                    $fail('The '.$attribute.' has already been used to apply for scholarship in this year.');
                }
            }],
            'f_adharfile' => ['nullable', Rule::requiredIf(empty($this->not_applicable) || (!empty($this->not_applicable) && $this->not_applicable == NotApplicable::Mother->value)), 'file', 'extensions:jpg,jpeg,png', 'min:1', 'max:515'],
            'm_adhar' => ['nullable', Rule::requiredIf(empty($this->not_applicable) || (!empty($this->not_applicable) && $this->not_applicable == NotApplicable::Father->value)),'numeric', 'digits:12', function ($attribute, $value, $fail) {
                $basic_detail = ApplicationBasicDetail::with('application')->where('m_adhar', $value)->whereHas('application')->first();
                if (!empty($basic_detail) && !empty($basic_detail->application) && $basic_detail->application->application_year == date('Y')) {
                    $fail('The '.$attribute.' has already been used to apply for scholarship in this year.');
                }
            }],
            'm_adharfile' => ['nullable', Rule::requiredIf(empty($this->not_applicable) || (!empty($this->not_applicable) && $this->not_applicable == NotApplicable::Father->value)), 'file', 'extensions:jpg,jpeg,png', 'min:1', 'max:515'],
            
            'type' => ['required', new Enum(AccountType::class)],
            'bank_name' => ['required', 'string'],
            'branch' => ['required', 'string'],
            'ifsc' => ['required', 'string'],
            'acc_no' => ['required','numeric'],
            'holder' => ['required', 'string'],
            'passbook' => 'required|file|extensions:jpg,jpeg,png|min:1|max:515',
            
            'who_working' => ['required', new Enum(Working::class)],
            'parent_guardian_name' => ['required', 'string'],
            'relationship' => ['required', 'string'],
            'msalary' => ['required','numeric'],
            'pincode' => ['required','numeric', 'digits:6'],
            'district_id' => 'required|numeric|exists:cities,id',
            'taluq_id' => 'required|numeric|exists:taluqs,id',
            'company_id' => 'required|numeric|exists:registered_industries,id',
            'salaryslip' => 'required|file|extensions:jpg,jpeg,png|min:1|max:515',
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

    protected function prepareForValidation(): void
    {
        $request = Purify::clean($this->all());
        $this->replace([...$request]);
    }
}
