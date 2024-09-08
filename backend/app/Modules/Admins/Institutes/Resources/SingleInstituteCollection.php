<?php

namespace App\Modules\Admins\Institutes\Resources;


class SingleInstituteCollection extends InstituteCollection
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
        unset($parentArray['taluq']);
        return $parentArray;
    }
}
