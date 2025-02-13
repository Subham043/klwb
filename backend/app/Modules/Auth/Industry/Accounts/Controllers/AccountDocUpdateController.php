<?php

namespace App\Modules\Auth\Industry\Accounts\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Services\RateLimitService;
use App\Modules\Auth\Industry\Accounts\Requests\AccountDocPatchRequest;
use App\Modules\Auth\Industry\Accounts\Resources\AccountInfoCollection;
use App\Modules\Auth\Industry\Accounts\Services\ProfileService;
use App\Modules\IndustryManagement\IndustryAuth\Services\IndustryAuthFileService;

class AccountDocUpdateController extends Controller
{
    public function __construct(private ProfileService $profileService, private IndustryAuthFileService $industryAuthFileService){}
    public function index(AccountDocPatchRequest $request){
        $account_info = $this->profileService->getAccountInfo();
        $request->validated();
        if($request->hasFile('reg_doc')){
            $this->industryAuthFileService->saveRegDoc($account_info);
        }
        if($request->hasFile('sign')){
            $this->industryAuthFileService->saveSign($account_info);
        }
        if($request->hasFile('seal')){
            $this->industryAuthFileService->saveSeal($account_info);
        }
        if($request->hasFile('gst')){
            $this->industryAuthFileService->saveGst($account_info);
        }
        if($request->hasFile('pan')){
            $this->industryAuthFileService->savePan($account_info);
        }
        (new RateLimitService($request))->clearRateLimit();
        return response()->json(["message" => "Account Info updated successfully.", "data" => AccountInfoCollection::make($account_info)], 200);
    }
}
