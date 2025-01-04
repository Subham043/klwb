<?php

namespace App\Modules\PaymentOfficer\Contribution\Resources;

use App\Modules\Admins\RequestIndustry\Enums\Act;
use Illuminate\Http\Resources\Json\JsonResource;

class NonContributionCollection extends JsonResource
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
            'reg_id' => $this->reg_id,
            'name' => $this->name,
            'act' => $this->act,
            'act_label' => Act::getValue($this->act),
            'category' => $this->category,
            'pincode' => $this->pincode,
            'is_active' => $this->is_active,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
