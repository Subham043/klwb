<?php

namespace App\Modules\Admins\Reports\Contributions\Resources;

use App\Modules\Admins\RequestIndustry\Enums\Act;
use Illuminate\Http\Resources\Json\JsonResource;

class ContributionComparisonReportCollection extends JsonResource
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
            'id' => $this->registered_industries_id,
            'name' => $this->registered_industries_name,
            'act_label' => Act::getValue($this->registered_industries_act),
            'category' => $this->registered_industries_category,
            'is_active' => $this->registered_industries_is_active,
            'price_selected_year' => $this->price_selected_year ? (string) $this->price_selected_year : 'Not Paid',
            'selected_year' => (string) $this->selected_year,
            'pay_id_selected_year' => $this->pay_id_selected_year ? (string) $this->pay_id_selected_year : 'Not Paid',
            'price_previous_selected_year' => $this->price_previous_selected_year ? (string) $this->price_previous_selected_year : 'Not Paid',
            'previous_selected_year' => (string) $this->previous_selected_year,
            'pay_id_previous_year' => $this->pay_id_previous_year ? (string) $this->pay_id_previous_year : 'Not Paid',
            'created_at' => $this->registered_industries_created_at,
            'updated_at' => $this->registered_industries_updated_at,
        ];
    }
}
