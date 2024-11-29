<?php

namespace App\Modules\Admins\Reports\Contributions\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ContributionReportCollection extends JsonResource
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
            'year' => $this->year,
            'male_count' => $this->male_count,
            'female_count' => $this->female_count,
            'total_countributions' => $this->total_countributions,
            'total_countribution_amount' => $this->total_countribution_amount,
        ];
    }
}
