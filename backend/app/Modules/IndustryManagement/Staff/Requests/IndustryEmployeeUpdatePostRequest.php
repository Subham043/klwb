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
        $parentRules = parent::rules();
        unset($parentRules['password']);
        unset($parentRules['password_confirmation']);
        return array_merge($parentRules, [
            'email' => 'required|string|email|max:255|unique:industry_auths,email,'.$this->route('id'),
            'phone' => 'required|numeric|digits:10|unique:industry_auths,phone,'.$this->route('id'),
        ]);
    }
}
