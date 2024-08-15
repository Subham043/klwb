<?php

namespace App\Modules\ApplicationManagement\Applications\Requests;

use App\Http\Enums\Guards;
use App\Modules\ApplicationManagement\Applications\Enums\AccountType;
use App\Modules\ApplicationManagement\Applications\Enums\Category;
use App\Modules\ApplicationManagement\Applications\Enums\Gender;
use App\Modules\ApplicationManagement\Applications\Enums\NotApplicable;
use App\Modules\ApplicationManagement\Applications\Enums\Working;
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
            'prv_marks' => ['required', 'string'],
            'marks_card_type' => 'required|boolean',
            'prv_markcard' => 'required|file|extensions:jpg,jpeg,png|min:1|max:515',
            'prv_markcard2' =>  ['nullable', Rule::requiredIf($this->marks_card_type==false), 'file', 'extensions:jpg,jpeg,png', 'min:1', 'max:515'],
            
            'is_scst' => 'required|boolean',
            'cast_no' => ['nullable', Rule::requiredIf($this->is_scst==true), 'string'],
            'cast_certificate' => ['nullable', Rule::requiredIf($this->is_scst==true), 'file', 'extensions:jpg,jpeg,png', 'min:1', 'max:515'],
            'category' => ['required', new Enum(Category::class)],
            
            'adharcard_no' => ['required','numeric', 'digits:12'],
            'adharcard_file' => 'required|file|extensions:jpg,jpeg,png|min:1|max:515',
            'not_applicable' => ['nullable', new Enum(NotApplicable::class)],
            'cast_certificate' => ['nullable', Rule::requiredIf(!empty($this->not_applicable) && ($this->not_applicable == NotApplicable::Mother->value || $this->not_applicable == NotApplicable::Father->value)), 'file', 'extensions:jpg,jpeg,png', 'min:1', 'max:515'],
            'f_adhar' => ['nullable', Rule::requiredIf(empty($this->not_applicable) || (!empty($this->not_applicable) && $this->not_applicable == NotApplicable::Mother->value)),'numeric', 'digits:12'],
            'f_adharfile' => ['nullable', Rule::requiredIf(empty($this->not_applicable) || (!empty($this->not_applicable) && $this->not_applicable == NotApplicable::Mother->value)), 'file', 'extensions:jpg,jpeg,png', 'min:1', 'max:515'],
            'm_adhar' => ['nullable', Rule::requiredIf(empty($this->not_applicable) || (!empty($this->not_applicable) && $this->not_applicable == NotApplicable::Father->value)),'numeric', 'digits:12'],
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
            'is_active' => 'Active'
        ];
    }

    protected function prepareForValidation(): void
    {
        $request = Purify::clean($this->all());
        $this->replace([...$request]);
    }
}
