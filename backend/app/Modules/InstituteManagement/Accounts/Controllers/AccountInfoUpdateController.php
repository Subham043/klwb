<?php

namespace App\Modules\InstituteManagement\Accounts\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\InstituteManagement\Accounts\Requests\AccountInfoPostRequest;
use App\Modules\InstituteManagement\Accounts\Resources\AccountInfoCollection;
use App\Modules\InstituteManagement\Accounts\Services\ProfileService;
use Illuminate\Support\Facades\DB;

class AccountInfoUpdateController extends Controller
{
    public function index(AccountInfoPostRequest $request){
        $account_info = (new ProfileService)->getAccountInfo();
        $request->validated();
        DB::beginTransaction();
        try {
            (new ProfileService)->getAccountInfoUpdate($request, $account_info);
            return response()->json(["message" => "Account Info updated successfully.", "data" => AccountInfoCollection::make($account_info)], 200);
        } catch (\Throwable $th) {
            DB::rollBack();
            return response()->json(["message" => "Something went wrong. Please try again"], 400);
        } finally {
            DB::commit();
        }
    }
}
