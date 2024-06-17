<?php

namespace App\Modules\Taluqs\Resources;

use App\Modules\Cities\Resources\CityCollection;
use App\Modules\States\Resources\StateCollection;
use Illuminate\Http\Resources\Json\JsonResource;

class TaluqCollection extends JsonResource
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
            'city_id' => $this->city_id,
            'city' => CityCollection::make($this->city),
            'state' => StateCollection::make($this->city->state),
            'is_active' => $this->is_active,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}