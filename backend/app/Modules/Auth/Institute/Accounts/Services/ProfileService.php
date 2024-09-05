<?php

namespace App\Modules\Auth\Institute\Accounts\Services;

use App\Http\Enums\Guards;
use App\Modules\Auth\Institute\Accounts\Requests\AccountInfoPostRequest;
use App\Modules\Auth\Institute\Authentication\Services\AuthService;
use App\Modules\InstituteManagement\Institutes\Models\InstituteAuth;
use App\Modules\InstituteManagement\Institutes\Models\School;
use App\Modules\Roles\Enums\Roles;

class ProfileService extends AuthService
{
	public function getAccountInfo(): School
	{
		$auth = InstituteAuth::where('id', auth()->guard(Guards::Institute->value())->user()->current_role == Roles::InstituteStaff->value() ? auth()->guard(Guards::Institute->value())->user()->created_by : auth()->guard(Guards::Institute->value())->user()->id)->firstOrFail();
		$account = School::with([
			'institute',
			'address' => function ($query) {
				$query->with(['state', 'city', 'taluq']);
			}
		])->where('id', $auth->school_id)->firstOrFail();
		return $account;
	}

	public function getAccountInfoUpdate(AccountInfoPostRequest $request, School $institute): School
	{
		$institute->update([
			'principal' => $request->principal,
			'email' => $request->email,
			'phone' => $request->phone,
		]);
		$institute->address->update([
			'address' => $request->address,
		]);
		$institute->refresh();
		return $institute;
	}
}
