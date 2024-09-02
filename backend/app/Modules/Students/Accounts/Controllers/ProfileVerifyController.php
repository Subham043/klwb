<?php

namespace App\Modules\Students\Accounts\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Enums\Guards;
use App\Http\Services\RateLimitService;
use App\Modules\Students\Accounts\Requests\ProfileVerifyPostRequest;
use App\Modules\Students\Accounts\Resources\ProfileCollection;
use App\Modules\Students\Accounts\Services\ProfileService;
use App\Modules\Students\Users\Services\UserService;

class ProfileVerifyController extends Controller
{
    private $profileService;
    private $userService;

    public function __construct(ProfileService $profileService, UserService $userService)
    {
        $this->profileService = $profileService;
        $this->userService = $userService;
    }

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
