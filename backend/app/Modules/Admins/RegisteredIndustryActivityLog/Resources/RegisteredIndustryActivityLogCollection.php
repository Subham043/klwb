<?php

namespace App\Modules\Admins\RegisteredIndustryActivityLog\Resources;

use App\Modules\Admins\Employees\Resources\EmployeeCollection;
use Illuminate\Http\Resources\Json\JsonResource;

class RegisteredIndustryActivityLogCollection extends JsonResource
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
            'causer' => EmployeeCollection::make($this->causer) ?? null,
            'causer_id' => $this->causer_id,
            'description' => $this->description,
            'event' => $this->event,
            'log_name' => $this->log_name,
            'subject_id' => $this->subject_id,
            'properties' => $this->properties,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
