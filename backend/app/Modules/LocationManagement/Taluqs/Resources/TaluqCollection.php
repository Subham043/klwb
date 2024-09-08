<?php

namespace App\Modules\LocationManagement\Taluqs\Resources;

use App\Modules\LocationManagement\Cities\Resources\CityCollection;

class TaluqCollection extends SingleTaluqCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        $parentArray = parent::toArray($request);
        return array_merge($parentArray, [
            'city' => CityCollection::make($this->whenLoaded('city')),
        ]);
    }
}
