<?php

namespace App\Modules\Admins\Fees\Resources;

use App\Modules\CourseManagement\Graduations\Resources\GraduationCollection;

class ExtendedFeeCollection extends FeeCollection
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
