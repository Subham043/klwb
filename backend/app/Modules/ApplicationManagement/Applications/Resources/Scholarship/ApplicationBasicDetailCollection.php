<?php

namespace App\Modules\ApplicationManagement\Applications\Resources\Scholarship;

use Illuminate\Http\Resources\Json\JsonResource;

class ApplicationBasicDetailCollection extends JsonResource
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
            'name' => $this->name,
            'father_name' => $this->father_name,
            'mother_name' => $this->mother_name,
            'address' => $this->address,
            'parent_phone' => $this->parent_phone,
            'is_scst' => $this->is_scst,
            'category' => $this->category,
            'cast_no' => $this->cast_no,
            'gender' => $this->gender,
            'adharcard_no' => $this->adharcard_no,
            'f_adhar' => $this->f_adhar,
            'm_adhar' => $this->m_adhar,
            'not_applicable' => $this->not_applicable,
        ];
    }
}