<?php

namespace App\Modules\Students\Scholarship\Resources;

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
            'cast_certificate' => $this->cast_certificate_link,
            'adharcard_file' => $this->adharcard_file_link,
            'f_adharfile' => $this->f_adharfile_link,
            'm_adharfile' => $this->m_adharfile_link,
            'deathcertificate' => $this->deathcertificate_link,
        ];
    }
}
