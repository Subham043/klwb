<?php

namespace App\Modules\Admins\RequestInstitutes\Resources;

use App\Modules\LocationManagement\Taluqs\Resources\TaluqCollection;
use Illuminate\Http\Resources\Json\JsonResource;

class RequestInstituteCollection extends JsonResource
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
            'email' => $this->email,
            'mobile' => $this->mobile,
            'pincode' => $this->pincode,
            'address' => $this->address,
            'register_doc' => $this->register_doc_link,
            'taluq_id' => $this->taluq_id,
            'taluq' => TaluqCollection::make($this->whenLoaded('taluq')),
            'status' => $this->status,
            'reject_reason' => $this->reject_reason,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
