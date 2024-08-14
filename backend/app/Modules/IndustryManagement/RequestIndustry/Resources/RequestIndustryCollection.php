<?php

namespace App\Modules\IndustryManagement\RequestIndustry\Resources;

use App\Modules\IndustryManagement\RequestIndustry\Enums\Act;
use App\Modules\LocationManagement\Cities\Resources\SingleCityCollection;
use App\Modules\LocationManagement\Taluqs\Resources\SingleTaluqCollection;
use Illuminate\Http\Resources\Json\JsonResource;

class RequestIndustryCollection extends JsonResource
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
            'company' => $this->company,
            'email' => $this->email,
            'mobile' => $this->mobile,
            'gst_no' => $this->gst_no,
            'pan_no' => $this->pan_no,
            'act' => $this->act,
            'act_label' => Act::getValue($this->act),
            'address' => $this->address,
            'register_doc' => $this->register_doc_link,
            'taluq_id' => $this->taluq_id,
            'taluq' => SingleTaluqCollection::make($this->whenLoaded('taluq')),
            'city_id' => $this->city_id,
            'city' => SingleCityCollection::make($this->whenLoaded('city')),
            'is_active' => $this->is_active,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
