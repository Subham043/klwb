<?php

namespace App\Modules\CourseManagement\Courses\Resources;

use App\Modules\CourseManagement\Graduations\Resources\GraduationCollection;

class CourseCollection extends SingleCourseCollection
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
            'graduation' => GraduationCollection::make($this->whenLoaded('graduation')),
        ]);
    }
}
