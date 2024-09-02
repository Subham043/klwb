<?php

namespace App\Modules\IndustryManagement\Accounts\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Enums\Guards;
use App\Http\Services\RateLimitService;
use App\Modules\IndustryManagement\Accounts\Requests\ProfileVerifyPostRequest;
use App\Modules\IndustryManagement\Accounts\Resources\ProfileCollection;
use App\Modules\IndustryManagement\Accounts\Services\ProfileService;
use App\Modules\IndustryManagement\Industry\Services\IndustryAuthService;

class ProfileVerifyController extends Controller
{
    private $profileService;
    private $instituteAuthService;

    public function __construct(ProfileService $profileService, IndustryAuthService $instituteAuthService)
    {
        $this->profileService = $profileService;
        $this->instituteAuthService = $instituteAuthService;
    }

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
