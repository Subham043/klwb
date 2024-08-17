<?php

namespace App\Modules\ApplicationManagement\Applications\Resources\Scholarship;

use Illuminate\Http\Resources\Json\JsonResource;

class ApplicationAccountCollection extends JsonResource
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
            'bank_name' => $this->name,
            'branch' => $this->branch,
            'ifsc' => $this->ifsc,
            'acc_no' => $this->acc_no,
            'holder' => $this->holder,
            'type' => $this->type,
            'passbook' => $this->passbook_link,
        ];
    }
}
