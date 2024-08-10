<?php

namespace App\Modules\InstituteManagement\Institutes\Resources;

use App\Modules\LocationManagement\Cities\Resources\SingleCityCollection;
use App\Modules\LocationManagement\States\Resources\StateCollection;
use App\Modules\LocationManagement\Taluqs\Resources\SingleTaluqCollection;
use Illuminate\Http\Resources\Json\JsonResource;

class InstituteAddressCollection extends JsonResource
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
            'address' => $this->address,
            'pincode' => $this->pincode,
            'state' => StateCollection::make($this->whenLoaded('state')),
            'city' => SingleCityCollection::make($this->whenLoaded('city')),
            'taluq' => SingleTaluqCollection::make($this->whenLoaded('taluq')),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
