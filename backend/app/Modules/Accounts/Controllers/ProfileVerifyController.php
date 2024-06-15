<?php

namespace App\Modules\Accounts\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Services\RateLimitService;
use App\Modules\Accounts\Requests\ProfileVerifyPostRequest;
use App\Modules\Accounts\Resources\ProfileCollection;
use App\Modules\Accounts\Services\ProfileService;
use App\Modules\Users\Services\UserService;

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
            $user = $this->profileService->profile();
            $this->userService->update(
                [
                    'verified_at' => now(),
                    'otp' => rand(1111, 9999),
                ],
                $user
            );

            (new RateLimitService($request))->clearRateLimit();
            return response()->json([
                'profile' => ProfileCollection::make(auth()->user()),
                'message' => "Profile Verified successfully.",
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => "something went wrong. Please try again.",
            ], 400);
        }

    }
}