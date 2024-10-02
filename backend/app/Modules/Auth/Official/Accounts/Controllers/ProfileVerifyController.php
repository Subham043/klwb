<?php

namespace App\Modules\Auth\Official\Accounts\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Services\RateLimitService;
use App\Modules\Auth\Common\Resources\ProfileCollection;
use App\Modules\Auth\Official\Accounts\Requests\ProfileVerifyPostRequest;

class ProfileVerifyController extends Controller
{

    public function index(ProfileVerifyPostRequest $request){

        try {
            //code...
            $request->user()->update(
                [
                    'verified_at' => now(),
                    'otp' => rand(1111, 9999),
                ],
            );

            (new RateLimitService($request))->clearRateLimit();
            return response()->json([
                'profile' => ProfileCollection::make($request->user()),
                'message' => "Profile Verified successfully.",
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => "something went wrong. Please try again.",
            ], 400);
        }

    }
}
