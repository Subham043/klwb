<?php

namespace App\Modules\Fees\Requests;

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
            'class_id' => ['required','numeric','exists:classes,id', Rule::unique('fees', 'class_id', 'year')->ignore($this->route('id'))],
            'is_active' => 'required|boolean',
        ];
    }

}
