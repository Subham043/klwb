<?php

namespace App\Modules\Auth\Industry\Accounts\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Enums\Guards;
use App\Http\Services\RateLimitService;
use App\Modules\Auth\Industry\Accounts\Services\ProfileService;
use App\Modules\Auth\Industry\Accounts\Requests\PasswordPostRequest;
use App\Modules\IndustryManagement\Industry\Services\IndustryAuthService;

class PasswordUpdateController extends Controller
{
    public function __construct(private IndustryAuthService $instituteAuthService, private ProfileService $profileService){}

    public function index(PasswordPostRequest $request)
    {
        try {
            //code...
            $user = $this->profileService->profile(Guards::Industry->value());
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
