<?php

namespace App\Modules\InstituteManagement\Accounts\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\InstituteManagement\Accounts\Requests\AccountDocPatchRequest;
use App\Modules\InstituteManagement\Accounts\Resources\AccountInfoCollection;
use App\Modules\InstituteManagement\Accounts\Services\ProfileService;

class AccountDocUpdateController extends Controller
{
    public function index(AccountDocPatchRequest $request){
        $account_info = (new ProfileService)->getAccountInfo();
        $request->validated();
        if($request->hasFile('reg_certification')){
            (new ProfileService)->saveRegCertification($account_info);
        }
        if($request->hasFile('principal_signature')){
            (new ProfileService)->savePrincipalSignature($account_info);
        }
        if($request->hasFile('seal')){
            (new ProfileService)->saveSeal($account_info);
        }
        return response()->json(["message" => "Account Info updated successfully.", "data" => AccountInfoCollection::make($account_info)], 200);
    }
}
