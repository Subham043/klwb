<?php

namespace App\Modules\IndustryManagement\Staff\Requests;


class IndustryEmployeeUpdatePostRequest extends IndustryEmployeeCreatePostRequest
{

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:industry_auths,email,'.$this->route('id'),
            'phone' => 'required|numeric|digits:10|unique:industry_auths,phone,'.$this->route('id'),
            'is_blocked' => 'required|boolean',
        ];
    }
}
