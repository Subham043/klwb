<?php

namespace App\Modules\Admins\RegisteredInstituteStaff\Requests;

use App\Http\Enums\Guards;
use App\Http\Requests\InputRequest;
use Illuminate\Support\Facades\Auth;


class RegisteredInstituteStaffAccountRequest extends InputRequest
{
	/**
	 * Determine if the user is authorized to make this request.
	 *
	 * @return bool
	 */
	public function authorize(): bool
	{
		return Auth::guard(Guards::Admin->value())->check();
	}

	/**
	 * Get the validation rules that apply to the request.
	 *
	 * @return array
	 */
	public function rules()
	{
		return [
			'name' => 'required|string|max:500',
			'email' => ['required', 'email:rfc,dns', 'unique:industry_auths,email,' . $this->route('staff_id')],
			'phone' => ['required', 'numeric', 'digits:10', 'unique:industry_auths,phone,' . $this->route('staff_id')],
		];
	}
}
