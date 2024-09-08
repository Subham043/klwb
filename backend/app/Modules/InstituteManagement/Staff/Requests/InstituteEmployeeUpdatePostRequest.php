<?php

namespace App\Modules\InstituteManagement\Staff\Requests;


class InstituteEmployeeUpdatePostRequest extends InstituteEmployeeCreatePostRequest
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
            'email' => 'required|string|email|max:255|unique:school_auths,email,'.$this->route('id'),
            'phone' => 'required|numeric|digits:10|unique:school_auths,phone,'.$this->route('id'),
        ]);
    }
}
