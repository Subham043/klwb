<?php

namespace App\Modules\IndustryManagement\Staff\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class IndustryEmployeeCollection extends JsonResource
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
            'email' => $this->email,
            'phone' => $this->phone,
            'verified' => $this->verified_at ? "VERIFIED": "VERIFICATION PENDING",
            'verified_at' => $this->verified_at,
            'is_blocked' => $this->is_blocked,
            'role' => $this->current_role,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
