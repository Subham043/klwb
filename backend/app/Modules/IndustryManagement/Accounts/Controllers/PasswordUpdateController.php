<?php

namespace App\Modules\IndustryManagement\Accounts\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Services\RateLimitService;
use App\Modules\IndustryManagement\Accounts\Services\ProfileService;
use App\Modules\IndustryManagement\Accounts\Requests\PasswordPostRequest;
use App\Modules\IndustryManagement\Industry\Services\IndustryAuthService;

class PasswordUpdateController extends Controller
{
    private $instituteAuthService;
    private $profileService;

    public function __construct(IndustryAuthService $instituteAuthService, ProfileService $profileService)
    {
        $this->instituteAuthService = $instituteAuthService;
        $this->profileService = $profileService;
    }

    public function index(PasswordPostRequest $request)
    {
        try {
            //code...
            $user = $this->profileService->profile();
            $this->instituteAuthService->updateIndustryAuth(
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
