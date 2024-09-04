<?php

namespace App\Modules\Auth\Industry\Accounts\Services;

use App\Http\Enums\Guards;
use App\Http\Services\FileService;
use App\Modules\Auth\Industry\Accounts\Requests\AccountInfoPostRequest;
use App\Modules\Auth\Industry\Authentication\Services\AuthService;
use App\Modules\IndustryManagement\Industry\Models\IndustryAuth;
use App\Modules\Roles\Enums\Roles;

class ProfileService extends AuthService
{
	public function getAccountInfo(): IndustryAuth
	{
		$account = IndustryAuth::with([
			'registered_industry',
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
		$industry->registered_industry->update([
			'pincode' => $request->pincode,
			'act' => $request->act,
		]);
		$industry->refresh();
		return $industry;
	}

	public function saveRegDoc(IndustryAuth $industry): IndustryAuth
	{
		$reg_doc = (new FileService)->save_file('reg_doc', (new IndustryAuth)->reg_doc_path);
		$industry->update([
			'reg_doc' => $reg_doc,
		]);
		$industry->refresh();
		return $industry;
	}

	public function saveSign(IndustryAuth $industry): IndustryAuth
	{
		$sign = (new FileService)->save_file('sign', (new IndustryAuth)->sign_path);
		$industry->update([
			'sign' => $sign,
		]);
		$industry->refresh();
		return $industry;
	}

	public function saveSeal(IndustryAuth $industry): IndustryAuth
	{
		$seal = (new FileService)->save_file('seal', (new IndustryAuth)->seal_path);
		$industry->update([
			'seal' => $seal,
		]);
		$industry->refresh();
		return $industry;
	}

	public function savePan(IndustryAuth $industry): IndustryAuth
	{
		$pan = (new FileService)->save_file('pan', (new IndustryAuth)->pan_path);
		$industry->update([
			'pan' => $pan,
		]);
		$industry->refresh();
		return $industry;
	}

	public function saveGst(IndustryAuth $industry): IndustryAuth
	{
		$gst = (new FileService)->save_file('gst', (new IndustryAuth)->gst_path);
		$industry->update([
			'gst' => $gst,
		]);
		$industry->refresh();
		return $industry;
	}
}
