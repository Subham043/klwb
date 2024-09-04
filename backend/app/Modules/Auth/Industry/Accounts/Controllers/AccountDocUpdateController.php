<?php

namespace App\Modules\Auth\Industry\Accounts\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Auth\Industry\Accounts\Requests\AccountDocPatchRequest;
use App\Modules\Auth\Industry\Accounts\Resources\AccountInfoCollection;
use App\Modules\Auth\Industry\Accounts\Services\ProfileService;

class AccountDocUpdateController extends Controller
{
    public function index(AccountDocPatchRequest $request){
        $account_info = (new ProfileService)->getAccountInfo();
        $request->validated();
        if($request->hasFile('reg_doc')){
            (new ProfileService)->saveRegDoc($account_info);
        }
        if($request->hasFile('sign')){
            (new ProfileService)->saveSign($account_info);
        }
        if($request->hasFile('seal')){
            (new ProfileService)->saveSeal($account_info);
        }
        if($request->hasFile('gst')){
            (new ProfileService)->saveGst($account_info);
        }
        if($request->hasFile('pan')){
            (new ProfileService)->savePan($account_info);
        }
        return response()->json(["message" => "Account Info updated successfully.", "data" => AccountInfoCollection::make($account_info)], 200);
    }
}
