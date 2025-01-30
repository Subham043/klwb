<?php

namespace App\Modules\Admins\RegisteredIndustry\Resources;

use App\Modules\Admins\Industries\Resources\IndustryCollection;
use App\Modules\LocationManagement\Cities\Resources\SingleCityCollection;
use App\Modules\LocationManagement\Taluqs\Resources\SingleTaluqCollection;
use Illuminate\Http\Resources\Json\JsonResource;

class RegisteredIndustryCollection extends JsonResource
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
            'name' => $this->name,
            'email' => $this->email,
            'phone' => $this->phone,
            'verified' => $this->verified_at ? "VERIFIED": "VERIFICATION PENDING",
            'verified_at' => $this->verified_at,
            'is_blocked' => $this->is_blocked,
            'role' => $this->current_role,
            'gst_no' => $this->gst_no,
            'pan_no' => $this->pan_no,
            'address' => $this->address,
            'reg_doc' => $this->reg_doc_link,
            'sign' => $this->sign_link,
            'seal' => $this->seal_link,
            'pan' => $this->pan_link,
            'gst' => $this->gst_link,
            'reg_industry_id' => $this->reg_industry_id,
            'industry' => IndustryCollection::make($this->whenLoaded('industry')),
            'city' => SingleCityCollection::make($this->whenLoaded('city')),
            'taluq' => SingleTaluqCollection::make($this->whenLoaded('taluq')),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
