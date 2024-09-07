<?php

namespace App\Modules\Admins\Fees\Requests;

use Illuminate\Validation\Rule;

class FeeUpdateRequest extends FeeCreateRequest
{

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'amount' => 'required|numeric|gt:0',
            'graduation_id' => ['required','numeric','exists:graduations,id', Rule::unique('fees', 'graduation_id', 'year')->ignore($this->route('id'))],
            'is_active' => 'required|boolean',
        ];
    }

}
