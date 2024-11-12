<?php

namespace App\Modules\Students\Scholarship\Resources;

use App\Modules\CourseManagement\Classes\Resources\SingleClassesCollection;
use App\Modules\CourseManagement\Courses\Resources\SingleCourseCollection;
use App\Modules\CourseManagement\Graduations\Resources\GraduationCollection;
use App\Modules\LocationManagement\Cities\Resources\SingleCityCollection;
use App\Modules\LocationManagement\Taluqs\Resources\SingleTaluqCollection;
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
            'graduation' => GraduationCollection::make($this->graduation),
            'course_id' => $this->course_id,
            'course' => SingleCourseCollection::make($this->course),
            'class_id' => $this->class_id,
            'class' => SingleClassesCollection::make($this->class),
            'ins_pin' => $this->ins_pin,
            'ins_district_id' => $this->ins_district_id,
            'district' => SingleCityCollection::make($this->whenLoaded('district')),
            'ins_taluq_id' => $this->ins_taluq_id,
            'taluq' => SingleTaluqCollection::make($this->whenLoaded('taluq')),
            'prv_class' => $this->prv_class,
            'prv_marks' => $this->prv_marks,
            'prv_markcard' => $this->prv_markcard_link,
            'prv_markcard2' => $this->prv_markcard2_link,
        ];
    }
}
