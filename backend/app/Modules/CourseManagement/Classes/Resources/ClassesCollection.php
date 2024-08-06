<?php

namespace App\Modules\CourseManagement\Classes\Resources;

use App\Modules\CourseManagement\Courses\Resources\CourseCollection;
use Illuminate\Http\Resources\Json\JsonResource;

class ClassesCollection extends JsonResource
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
            'course_id' => $this->course_id,
            'course' => CourseCollection::make($this->course),
            'is_active' => $this->is_active,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
