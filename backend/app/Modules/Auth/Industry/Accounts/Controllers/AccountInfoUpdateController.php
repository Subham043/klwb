<?php

namespace App\Modules\Auth\Industry\Accounts\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Services\RateLimitService;
use App\Modules\Auth\Industry\Accounts\Requests\AccountInfoPostRequest;
use App\Modules\Auth\Industry\Accounts\Resources\AccountInfoCollection;
use App\Modules\Auth\Industry\Accounts\Services\ProfileService;
use Illuminate\Support\Facades\DB;

class AccountInfoUpdateController extends Controller
{
    public function index(AccountInfoPostRequest $request){
        $account_info = (new ProfileService)->getAccountInfo();
        $request->validated();
        DB::beginTransaction();
        try {
            (new ProfileService)->getAccountInfoUpdate($request, $account_info);
            (new RateLimitService($request))->clearRateLimit();
            return response()->json(["message" => "Account Info updated successfully.", "data" => AccountInfoCollection::make($account_info)], 200);
        } catch (\Throwable $th) {
            DB::rollBack();
            return response()->json(["message" => "Something went wrong. Please try again"], 400);
        } finally {
            DB::commit();
        }
    }
}
