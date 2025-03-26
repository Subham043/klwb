<?php

namespace App\Modules\Auth\Official\Accounts\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Services\RateLimitService;
use App\Modules\Auth\Common\Resources\ProfileCollection;
use App\Modules\Auth\Official\Accounts\Requests\ProfilePostRequest;

class ProfileUpdateController extends Controller
{

    public function index(ProfilePostRequest $request){

        $email_status = false;
        $phone_status = false;
        try {
            //code...
            $user = $request->user();
            if($user->email != $request->email) {
                $email_status = true;
            }
            if($user->phone != $request->phone) {
                $phone_status = true;
            }
            $user->update(
                [
                    ...$request->validated(),
                    'verified_at' => ($email_status || $phone_status) ? null : $user->verified_at
                ]
            );
            (new RateLimitService($request))->clearRateLimit();
            return response()->json([
                'profile' => ProfileCollection::make($request->user()),
                'message' => "Profile Updated successfully.",
            ], 200);
        } catch (\Throwable $th) {
            // throw $th;
            return response()->json([
                'message' => "something went wrong. Please try again.",
            ], 400);
        }

    }
}
