<?php

namespace App\Modules\LocationManagement\Cities\Resources;

use App\Modules\LocationManagement\States\Resources\StateCollection;

class CityCollection extends SingleCityCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        $parentRules = parent::toArray($request);
        return array_merge($parentRules, [
            'state' => StateCollection::make($this->whenLoaded('state')),
        ]);
    }
}
