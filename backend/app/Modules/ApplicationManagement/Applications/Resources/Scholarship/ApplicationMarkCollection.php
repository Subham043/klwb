<?php

namespace App\Modules\ApplicationManagement\Applications\Resources\Scholarship;

use Illuminate\Http\Resources\Json\JsonResource;

class ApplicationMarkCollection extends JsonResource
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
            'graduation_id' => $this->graduation_id,
            'course_id' => $this->course_id,
            'class_id' => $this->class_id,
            'ins_pin' => $this->ins_pin,
            'ins_district_id' => $this->ins_district_id,
            'ins_taluq_id' => $this->ins_taluq_id,
            'prv_class' => $this->prv_class,
            'prv_marks' => $this->prv_marks,
        ];
    }
}
