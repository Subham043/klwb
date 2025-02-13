<?php

namespace App\Modules\Students\Scholarship\Resources;

use App\Modules\Admins\Fees\Resources\FeeCollection;
use App\Modules\Students\Scholarship\Enums\ApplicationState;
use App\Modules\Students\Users\Resources\UserCollection;
use Illuminate\Http\Resources\Json\JsonResource;

class ApplicationCollection extends JsonResource
{
    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'application_year' => $this->application_year,
            'school_id' => $this->school_id,
            'present_institute_name' => $this->institute->name ?? null,
            'present_institute_address' => $this->institute->auth->address->address ?? null,
            'institute_confirmation_report' => ($this->application_state > ApplicationState::School->value && $this->institute->auth) ? (($this->institute->auth->reg_certification_link!=null && $this->institute->auth->principal_signature_link!=null && $this->institute->auth->seal_link!=null) ? true : false) : false,
            'industry_name' => $this->industry->name ?? null,
            'industry_confirmation_report' => ($this->application_state > ApplicationState::Company->value && $this->industry->auth) ? (($this->industry->auth->reg_doc_link!=null && $this->industry->auth->sign_link!=null && $this->industry->auth->seal_link!=null && $this->industry->auth->gst_link!=null && $this->industry->auth->pan_link!=null && $this->industryPaymentInfo) ? true : false) : false,
            'company_id' => $this->company_id,
            'uniq' => $this->uniq,
            'status' => $this->status,
            'application_state' => $this->application_state,
            'reject_reason' => $this->reject_reason,
            'date' => $this->date,
            'school_approve' => $this->school_approve,
            'company_approve' => $this->company_approve,
            'govt_approve' => $this->govt_approve,
            'admin_approve' => $this->admin_approve,
            'account' => ApplicationAccountCollection::make($this->account),
            'mark' => ApplicationMarkCollection::make($this->mark),
            'company' => ApplicationCompanyCollection::make($this->company),
            'basic_detail' => ApplicationBasicDetailCollection::make($this->basic_detail),
            'student' => UserCollection::make($this->student),
            'scholarship_fee' => $this->mark->graduation->scholarship_fee ? FeeCollection::make($this->mark->graduation->scholarship_fee) : null,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
