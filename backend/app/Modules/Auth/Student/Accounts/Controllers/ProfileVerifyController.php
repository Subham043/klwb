<?php

namespace App\Modules\Auth\Student\Accounts\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Enums\Guards;
use App\Http\Services\RateLimitService;
use App\Modules\Auth\Common\Resources\ProfileCollection;
use App\Modules\Auth\Student\Accounts\Requests\ProfileVerifyPostRequest;
use App\Modules\Auth\Student\Accounts\Services\ProfileService;
use App\Modules\Students\Users\Services\UserService;

class ProfileVerifyController extends Controller
{
    
    public function __construct(private UserService $userService, private ProfileService $profileService){}

    public function index(ProfileVerifyPostRequest $request){

        try {
            //code...
            $user = $this->profileService->profile(Guards::Web->value());
            $this->userService->update(
                [
                    'verified_at' => now(),
                    'otp' => rand(1111, 9999),
                ],
                $user
            );

            (new RateLimitService($request))->clearRateLimit();
            return response()->json([
                'profile' => ProfileCollection::make(auth()->guard(Guards::Web->value())->user()),
                'message' => "Profile Verified successfully.",
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => "something went wrong. Please try again.",
            ], 400);
        }

    }
}
