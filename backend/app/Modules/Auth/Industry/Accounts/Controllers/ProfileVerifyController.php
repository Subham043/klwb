<?php

namespace App\Modules\Auth\Industry\Accounts\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Enums\Guards;
use App\Http\Services\RateLimitService;
use App\Modules\Auth\Industry\Accounts\Requests\ProfileVerifyPostRequest;
use App\Modules\Auth\Industry\Accounts\Resources\ProfileCollection;
use App\Modules\Auth\Industry\Accounts\Services\ProfileService;
use App\Modules\IndustryManagement\Industry\Services\IndustryAuthService;

class ProfileVerifyController extends Controller
{
    public function __construct(private ProfileService $profileService, private IndustryAuthService $instituteAuthService){}

    public function index(ProfileVerifyPostRequest $request){

        try {
            //code...
            $user = $this->profileService->profile(Guards::Industry->value());
            $this->instituteAuthService->update(
                [
                    'verified_at' => now(),
                    'otp' => rand(1111, 9999),
                ],
                $user
            );

            (new RateLimitService($request))->clearRateLimit();
            return response()->json([
                'profile' => ProfileCollection::make(auth()->guard(Guards::Industry->value())->user()),
                'message' => "Profile Verified successfully.",
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => "something went wrong. Please try again.",
            ], 400);
        }

    }
}
