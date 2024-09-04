<?php

namespace App\Modules\Auth\Institute\Accounts\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Enums\Guards;
use App\Http\Services\RateLimitService;
use App\Modules\Auth\Institute\Accounts\Services\ProfileService;
use App\Modules\Auth\Institute\Accounts\Requests\PasswordPostRequest;
use App\Modules\InstituteManagement\Institutes\Services\InstituteAuthService;

class PasswordUpdateController extends Controller
{
    public function __construct(private InstituteAuthService $instituteAuthService, private ProfileService $profileService){}

    public function index(PasswordPostRequest $request)
    {
        try {
            //code...
            $user = $this->profileService->profile(Guards::Institute->value());
            $this->instituteAuthService->update(
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
