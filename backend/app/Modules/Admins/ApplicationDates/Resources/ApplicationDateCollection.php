<?php

namespace App\Modules\Admins\ApplicationDates\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ApplicationDateCollection extends JsonResource
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
            'from_date' => $this->from_date,
            'to_date' => $this->to_date,
            'application_year' => $this->application_year,
            'user_id' => $this->user_id,
            'is_active' => $this->is_active,
            'can_resubmit' => $this->can_resubmit,
            'can_approve' => $this->can_approve,
            'can_verify' => $this->can_verify,
            'has_expired' => $this->has_expired,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
