<?php

namespace App\Modules\InstituteManagement\Accounts\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Enums\Guards;
use App\Http\Services\RateLimitService;
use App\Modules\InstituteManagement\Accounts\Requests\ProfileVerifyPostRequest;
use App\Modules\InstituteManagement\Accounts\Resources\ProfileCollection;
use App\Modules\InstituteManagement\Accounts\Services\ProfileService;
use App\Modules\InstituteManagement\Institutes\Services\InstituteAuthService;

class ProfileVerifyController extends Controller
{
    
    public function __construct(private InstituteAuthService $instituteAuthService, private ProfileService $profileService){}

    public function index(ProfileVerifyPostRequest $request){

        try {
            //code...
            $user = $this->profileService->profile(Guards::Institute->value());
            $this->instituteAuthService->update(
                [
                    'verified_at' => now(),
                    'otp' => rand(1111, 9999),
                ],
                $user
            );

            (new RateLimitService($request))->clearRateLimit();
            return response()->json([
                'profile' => ProfileCollection::make(auth()->guard(Guards::Institute->value())->user()),
                'message' => "Profile Verified successfully.",
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => "something went wrong. Please try again.",
            ], 400);
        }

    }
}
