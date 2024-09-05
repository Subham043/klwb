<?php

namespace App\Modules\Admins\RegisteredInstitute\Resources;

use App\Modules\InstituteManagement\Institutes\Resources\InstituteAddressCollection;
use App\Modules\InstituteManagement\Institutes\Resources\InstituteAuthCollection;
use App\Modules\Admins\Institutes\Resources\SingleInstituteCollection;
use Illuminate\Http\Resources\Json\JsonResource;

class RegisteredInstituteCollection extends JsonResource
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
            'institute' => SingleInstituteCollection::make($this->whenLoaded('institute')),
            'address' => InstituteAddressCollection::make($this->whenLoaded('address')),
            'profile' => InstituteAuthCollection::make($this->whenLoaded('profile')),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
