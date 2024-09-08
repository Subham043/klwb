<?php

namespace App\Modules\CourseManagement\Courses\Resources;

use App\Modules\CourseManagement\Graduations\Resources\GraduationCollection;
use Illuminate\Http\Resources\Json\JsonResource;

class SingleCourseCollection extends JsonResource
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
            'graduation_id' => $this->graduation_id,
            'is_active' => $this->is_active,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
