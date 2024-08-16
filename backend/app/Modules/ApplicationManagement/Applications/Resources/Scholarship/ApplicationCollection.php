<?php

namespace App\Modules\ApplicationManagement\Applications\Resources\Scholarship;

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
            'application_year' => $this->application_year,
            'school_id' => $this->school_id,
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
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
