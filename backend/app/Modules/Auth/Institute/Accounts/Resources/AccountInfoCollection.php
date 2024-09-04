<?php

namespace App\Modules\Auth\Institute\Accounts\Resources;

use App\Modules\InstituteManagement\Institutes\Resources\InstituteAddressCollection;
use App\Modules\InstituteManagement\RegisteredInstitutes\Resources\SingleRegisteredInstituteCollection;
use Illuminate\Http\Resources\Json\JsonResource;

class AccountInfoCollection extends JsonResource
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
			'registered_institute' => SingleRegisteredInstituteCollection::make($this->whenLoaded('registered_institute')),
			'address' => InstituteAddressCollection::make($this->whenLoaded('address')),
			'created_at' => $this->created_at,
			'updated_at' => $this->updated_at,
		];
	}
}
