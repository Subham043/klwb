<?php

namespace App\Modules\Admins\Scholarship\Resources;

use App\Modules\Admins\ApplicationDates\Services\ScholarshipApplicationChecksService;
use App\Modules\Students\Scholarship\Resources\ApplicationCollection;
use App\Modules\Students\Users\Resources\UserCollection;

class AdminApplicationCollection extends ApplicationCollection
{
	/**
	 * Transform the resource collection into an array.
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
	 */
	public function toArray($request)
	{
		$applicationCheck = (new ScholarshipApplicationChecksService)->canAdminVerify($this->resource);
		$parentArray = parent::toArray($request);
		return array_merge($parentArray, [
			'pay_status' => $this->pay_status,
			'payf_reason' => $this->payf_reason,
			'admin_note' => $this->admin_note,
			'resubmitted_status' => $this->resubmitted_status,
			'hold' => $this->hold,
			'deleted' => $this->deleted,
			'inactive' => $this->inactive,
			'delete_reason' => $this->delete_reason,
			'approved_by' => $this->approved_by ? UserCollection::make($this->approved_by) : null,
			'industryPayment' => PaymentCollection::make($this->industryPayment) ?? null,
			'can_approve' => $applicationCheck,
		]);
	}
}
