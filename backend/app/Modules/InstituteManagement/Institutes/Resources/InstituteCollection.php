<?php

namespace App\Modules\InstituteManagement\Institutes\Resources;

use App\Modules\InstituteManagement\RegisteredInstitutes\Resources\RegisteredInstituteCollection;
use Illuminate\Http\Resources\Json\JsonResource;

class InstituteCollection extends JsonResource
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
            'reg_no' => $this->reg_no,
            'principal' => $this->principal,
            'email' => $this->email,
            'phone' => $this->phone,
            'reg_certification' => $this->reg_certification_link,
            'principal_signature' => $this->principal_signature_link,
            'seal' => $this->seal_link,
            'registered_institute' => RegisteredInstituteCollection::make($this->whenLoaded('registered_institute')),
            'address' => InstituteAddressCollection::make($this->whenLoaded('address')),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
