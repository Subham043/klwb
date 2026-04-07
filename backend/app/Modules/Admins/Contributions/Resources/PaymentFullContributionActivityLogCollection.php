<?php

namespace App\Modules\Admins\Contributions\Resources;

use App\Modules\Admins\Employees\Resources\EmployeeCollection;
use App\Modules\IndustryManagement\Payment\Enums\PaymentStatus;
use Illuminate\Http\Resources\Json\JsonResource;

class PaymentFullContributionActivityLogCollection extends JsonResource
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
            'causer' => EmployeeCollection::make($this->causer) ?? null,
            'causer_id' => $this->causer_id,
            'description' => $this->description,
            'event' => $this->event,
            'log_name' => $this->log_name,
            'subject_id' => $this->subject_id,
            'properties' => $this->properties,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'payment' => $this->payment_id ? [
                'id' => $this->payment_id,
                'year' => $this->year,
                'comp_regd_id' => $this->comp_regd_id,
                'pay_id' => $this->pay_id,
                'male' => $this->male,
                'female' => $this->female,
                'total_employees' => $this->female + $this->male,
                'interest' => $this->interest,
                'price' => $this->price,
                'status' => $this->status,
                'payed_on' => $this->payed_on,
                'industry_name' => $this->industry_name,
                'industry_id' => $this->industry_id,
                'industry_is_active' => $this->industry_is_active,
                'status_text' => PaymentStatus::getValue($this->status),
            ] : null,
        ];
    }
}
