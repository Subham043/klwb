<?php

namespace App\Modules\Auth\Student\Accounts\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Services\RateLimitService;
use App\Modules\Auth\Student\Accounts\Services\ProfileService;
use App\Modules\Auth\Student\Accounts\Requests\PasswordPostRequest;
use App\Http\Enums\Guards;
use App\Modules\Students\Users\Services\UserService;

class PasswordUpdateController extends Controller
{
    public function __construct(private UserService $userService, private ProfileService $profileService){}

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
