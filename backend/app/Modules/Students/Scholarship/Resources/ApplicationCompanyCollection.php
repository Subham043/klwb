<?php

namespace App\Modules\Students\Scholarship\Resources;

use App\Modules\LocationManagement\Cities\Resources\SingleCityCollection;
use App\Modules\LocationManagement\Taluqs\Resources\SingleTaluqCollection;
use Illuminate\Http\Resources\Json\JsonResource;

class ApplicationCompanyCollection extends JsonResource
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
            'who_working' => $this->who_working,
            'parent_guardian_name' => $this->name,
            'relationship' => $this->relationship,
            'msalary' => $this->msalary,
            'pincode' => $this->pincode,
            'district_id' => $this->district_id,
            'district' => SingleCityCollection::make($this->whenLoaded('district')),
            'taluq_id' => $this->taluq_id,
            'taluq' => SingleTaluqCollection::make($this->whenLoaded('taluq')),
            'salaryslip' => $this->salaryslip_link,
        ];
    }
}
