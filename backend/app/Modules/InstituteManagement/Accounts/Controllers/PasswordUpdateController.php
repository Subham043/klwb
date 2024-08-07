<?php

namespace App\Modules\InstituteManagement\Accounts\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Services\RateLimitService;
use App\Modules\InstituteManagement\Accounts\Services\ProfileService;
use App\Modules\InstituteManagement\Accounts\Requests\PasswordPostRequest;
use App\Modules\InstituteManagement\Institutes\Services\InstituteAuthService;

class PasswordUpdateController extends Controller
{
    private $instituteAuthService;
    private $profileService;

    public function __construct(InstituteAuthService $instituteAuthService, ProfileService $profileService)
    {
        $this->instituteAuthService = $instituteAuthService;
        $this->profileService = $profileService;
    }

    public function index(PasswordPostRequest $request)
    {
        try {
            //code...
            $user = $this->profileService->profile();
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
