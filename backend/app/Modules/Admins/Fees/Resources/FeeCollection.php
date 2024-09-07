<?php

namespace App\Modules\Admins\Fees\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class FeeCollection extends JsonResource
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
            'amount' => $this->amount,
            'year' => $this->year,
            'graduation_id' => $this->graduation_id,
            'graduation' => GraduationCollection::make($this->graduation),
            'user_id' => $this->user_id,
            'is_active' => $this->is_active,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
