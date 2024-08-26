<?php

namespace App\Modules\InstituteManagement\Accounts\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\InstituteManagement\Accounts\Resources\AccountInfoCollection;
use App\Modules\InstituteManagement\Accounts\Services\ProfileService;

class AccountInfoController extends Controller
{
    public function index(){
        $account_info = (new ProfileService)->getAccountInfo();
        return response()->json([
            'account_info' => AccountInfoCollection::make($account_info),
        ], 200);
    }
}
