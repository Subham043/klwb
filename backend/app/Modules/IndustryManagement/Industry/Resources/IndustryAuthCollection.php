<?php

namespace App\Modules\IndustryManagement\Industry\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class IndustryAuthCollection extends JsonResource
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
            'role' => $this->currentRole,
            'gst_no' => $this->gst_no,
            'pan_no' => $this->pan_no,
            'address' => $this->address,
            'reg_doc' => $this->reg_doc_link,
            'sign' => $this->sign_link,
            'seal' => $this->seal_link,
            'pan' => $this->pan_link,
            'gst' => $this->gst_link,
            'reg_industry_id' => $this->reg_industry_id,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}