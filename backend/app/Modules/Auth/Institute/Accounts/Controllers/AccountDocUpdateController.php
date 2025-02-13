<?php

namespace App\Modules\Auth\Institute\Accounts\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Services\RateLimitService;
use App\Modules\Auth\Institute\Accounts\Requests\AccountDocPatchRequest;
use App\Modules\Auth\Institute\Accounts\Resources\AccountInfoCollection;
use App\Modules\Auth\Institute\Accounts\Services\ProfileService;
use App\Modules\InstituteManagement\Institutes\Services\InstituteAuthFileService;

class AccountDocUpdateController extends Controller
{

    public function __construct(private ProfileService $profileService, private InstituteAuthFileService $instituteAuthFileService){}

    public function index(AccountDocPatchRequest $request){
        $account_info = $this->profileService->getAccountInfo();
        $request->validated();
        if($request->hasFile('reg_certification')){
            $this->instituteAuthFileService->saveRegCertification($account_info);
        }
        if($request->hasFile('principal_signature')){
            $this->instituteAuthFileService->savePrincipalSignature($account_info);
        }
        if($request->hasFile('seal')){
            $this->instituteAuthFileService->saveSeal($account_info);
        }
        (new RateLimitService($request))->clearRateLimit();
        return response()->json(["message" => "Account Info updated successfully.", "data" => AccountInfoCollection::make($account_info)], 200);
    }
}
