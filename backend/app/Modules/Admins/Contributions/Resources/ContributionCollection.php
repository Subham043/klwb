<?php

namespace App\Modules\Admins\Contributions\Resources;

use App\Http\Services\NumberToWordService;
use App\Modules\IndustryManagement\Payment\Enums\PaymentStatus;
use Illuminate\Http\Resources\Json\JsonResource;

class ContributionCollection extends JsonResource
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
            'comp_regd_id' => $this->comp_regd_id,
            'year' => $this->year,
            'pay_id' => $this->pay_id,
            'male' => $this->male,
            'female' => $this->female,
            'total_employees' => $this->female + $this->male,
            'interest' => $this->interest ?? 0,
            'price' => $this->price,
            'price_word' => (new NumberToWordService)->convert($this->price),
            'resolved' => $this->resolved,
            'status' => $this->status,
            'status_text' => PaymentStatus::getValue($this->status),
            'payed_on' => $this->payed_on,
            'is_edited' => $this->is_edited,
            'employee_excel' => $this->employee_excel_link,
            'industry' => $this->industry ? IndustryCollection::make($this->industry) : null,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
