<?php

namespace App\Modules\CourseManagement\Classes\Resources;

use App\Modules\CourseManagement\Courses\Resources\CourseCollection;

class ClassesCollection extends SingleClassesCollection
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
            'course' => CourseCollection::make($this->whenLoaded('course')),
        ]);
    }
}
