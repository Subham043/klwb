<?php

namespace App\Http\Requests;

use App\Http\Enums\Guards;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;


class ToggleStatusRequest extends InputRequest
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
		$user = $this->user();
		return [
			'password' => ['required', 'string', function ($attribute, $value, $fail) use ($user) {
				if (!Hash::check($value, $user->password)) {
					$fail('The password entered is incorrect.');
				}
			}],
		];
	}
}
