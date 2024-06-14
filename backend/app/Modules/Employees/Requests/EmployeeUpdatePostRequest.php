<?php

namespace App\Modules\Employees\Requests;


class EmployeeUpdatePostRequest extends EmployeeCreatePostRequest
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
            'email' => 'required|string|email|max:255|unique:users,email,'.$this->route('id'),
            'phone' => 'required|numeric|digits:10|unique:users,phone,'.$this->route('id'),
            'role' => 'required|string|exists:Spatie\Permission\Models\Role,name',
            'is_blocked' => 'required|boolean',
        ];
    }
}