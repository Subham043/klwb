<?php

namespace App\Modules\Govt\Scholarship\Resources;

use App\Modules\Students\Scholarship\Resources\ApplicationCollection;

class GovtApplicationCollection extends ApplicationCollection
{
	/**
	 * Transform the resource collection into an array.
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
	 */
	public function toArray($request)
	{
		$parentArray = parent::toArray($request);
		return array_merge($parentArray, [
			'pay_status' => $this->pay_status,
			'payf_reason' => $this->payf_reason,
			'govt_note' => $this->govt_note,
			'resubmitted_status' => $this->resubmitted_status,
		]);
	}
}
