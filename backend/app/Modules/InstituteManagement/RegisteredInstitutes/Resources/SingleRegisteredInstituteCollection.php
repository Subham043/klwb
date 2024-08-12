<?php

namespace App\Modules\InstituteManagement\RegisteredInstitutes\Resources;

use App\Modules\InstituteManagement\RegisteredInstitutes\Enums\UrbanRural;
use App\Modules\LocationManagement\Taluqs\Resources\TaluqCollection;
use Illuminate\Http\Resources\Json\JsonResource;

class SingleRegisteredInstituteCollection extends JsonResource
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
            'name' => $this->name,
            'management_type' => $this->management_type,
            'category' => $this->category,
            'type' => $this->type,
            'urban_rural' => UrbanRural::getValue($this->urban_rural),
            'is_active' => $this->is_active,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
