<?php

namespace App\Modules\Auth\Industry\Accounts\Services;

use App\Http\Enums\Guards;
use App\Modules\Auth\Industry\Accounts\Requests\AccountInfoPostRequest;
use App\Modules\Auth\Industry\Authentication\Services\AuthService;
use App\Modules\IndustryManagement\IndustryAuth\Models\IndustryAuth;
use App\Modules\Roles\Enums\Roles;

class ProfileService extends AuthService
{
	public function getAccountInfo(): IndustryAuth
	{
		$account = IndustryAuth::with([
			'industry',
			'taluq',
			'city',
		])->where('id', auth()->guard(Guards::Industry->value())->user()->current_role == Roles::IndustryStaff->value() ? auth()->guard(Guards::Industry->value())->user()->created_by : auth()->guard(Guards::Industry->value())->user()->id)->firstOrFail();
		return $account;
	}

	public function getAccountInfoUpdate(AccountInfoPostRequest $request, IndustryAuth $industry): IndustryAuth
	{
		$industry->update([
			'gst_no' => $request->gst_no,
			'pan_no' => $request->pan_no,
			'address' => $request->address,
		]);
		$industry->industry->update([
			'pincode' => $request->pincode,
			'act' => $request->act,
		]);
		$industry->refresh();
		return $industry;
	}
}
