<?php

namespace App\Modules\Students\Accounts\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Services\RateLimitService;
use App\Modules\Students\Users\Services\UserService;
use App\Modules\Students\Accounts\Services\ProfileService;
use App\Modules\Students\Accounts\Requests\PasswordPostRequest;
use App\Http\Enums\Guards;

class PasswordUpdateController extends Controller
{
    private $userService;
    private $profileService;

    public function __construct(UserService $userService, ProfileService $profileService)
    {
        $this->userService = $userService;
        $this->profileService = $profileService;
    }

    public function index(PasswordPostRequest $request)
    {
        try {
            //code...
            $user = $this->profileService->profile(Guards::Web->value());
            $this->userService->update(
                $request->safe()->only('password'),
                $user
            );
            (new RateLimitService($request))->clearRateLimit();
            return response()->json([
                'message' => "Password Updated successfully.",
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => "something went wrong. Please try again",
            ], 400);
        }

    }
}
