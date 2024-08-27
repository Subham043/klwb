<?php

namespace App\Modules\IndustryManagement\Accounts\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\IndustryManagement\Accounts\Resources\AccountInfoCollection;
use App\Modules\IndustryManagement\Accounts\Services\ProfileService;

class AccountInfoController extends Controller
{
    public function index(){
        $account_info = (new ProfileService)->getAccountInfo();
        return response()->json([
            'account_info' => AccountInfoCollection::make($account_info),
        ], 200);
    }
}
