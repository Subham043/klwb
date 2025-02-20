<?php

namespace App\Modules\Admins\Contributions\Resources;

use App\Modules\Admins\RequestIndustry\Enums\Act;
use App\Modules\LocationManagement\Cities\Resources\SingleCityCollection;
use App\Modules\LocationManagement\Taluqs\Resources\SingleTaluqCollection;
use Illuminate\Http\Resources\Json\JsonResource;

class IndustryCollection extends JsonResource
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
            'reg_id' => $this->reg_id,
            'name' => $this->name,
            'act' => $this->act,
            'act_label' => Act::getValue($this->act),
            'category' => $this->category,
            'pincode' => $this->pincode,
            'is_active' => $this->is_active,
            'city' => $this->auth && $this->auth->city ? SingleCityCollection::make($this->auth->city) : null,
            'taluq' => $this->auth && $this->auth->taluq ? SingleTaluqCollection::make($this->auth->taluq) : null,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
