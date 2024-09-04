<?php

namespace App\Modules\Auth\Official\Accounts\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Enums\Guards;
use App\Http\Services\RateLimitService;
use App\Modules\Admins\Employees\Services\EmployeeService;
use App\Modules\Auth\Common\Resources\ProfileCollection;
use App\Modules\Auth\Official\Accounts\Requests\ProfileVerifyPostRequest;
use App\Modules\Auth\Official\Accounts\Services\ProfileService;

class ProfileVerifyController extends Controller
{

    public function __construct(private ProfileService $profileService, private EmployeeService $employeeService){}

    public function index(ProfileVerifyPostRequest $request){

        try {
            //code...
            $employee = $this->profileService->profile(Guards::Admin->value());
            $this->employeeService->update(
                [
                    'verified_at' => now(),
                    'otp' => rand(1111, 9999),
                ],
                $employee
            );

            (new RateLimitService($request))->clearRateLimit();
            return response()->json([
                'profile' => ProfileCollection::make(auth()->guard(Guards::Admin->value())->user()),
                'message' => "Profile Verified successfully.",
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => "something went wrong. Please try again.",
            ], 400);
        }

    }
}
