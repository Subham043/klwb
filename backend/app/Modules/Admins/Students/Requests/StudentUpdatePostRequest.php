<?php

namespace App\Modules\Admins\Students\Requests;


class StudentUpdatePostRequest extends StudentCreatePostRequest
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
            'email' => 'required|string|email|max:255|unique:users,email,'.$this->route('id'),
            'phone' => 'required|numeric|digits:10|unique:users,phone,'.$this->route('id'),
        ]);
    }
}
