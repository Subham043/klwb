<?php

namespace App\Modules\Admins\Reports\Scholarship\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ScholarshipReportCollection extends JsonResource
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
            'application_year' => $this->year,
            'sc_count' => $this->sc_count,
            'st_count' => $this->st_count,
            'obc_count' => $this->obc_count,
            'general_count' => $this->general_count,
            'male_count' => $this->male_count,
            'female_count' => $this->female_count,
            'pending_count' => $this->pending_count,
            'rejected_count' => $this->rejected_count,
            'approved_count' => $this->approved_count,
            'total_count' => $this->total_count,
        ];
    }
}
