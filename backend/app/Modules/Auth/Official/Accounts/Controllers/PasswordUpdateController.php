<?php

namespace App\Modules\Auth\Official\Accounts\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Enums\Guards;
use App\Http\Services\RateLimitService;
use App\Modules\Admins\Employees\Services\EmployeeService;
use App\Modules\Auth\Official\Accounts\Services\ProfileService;
use App\Modules\Auth\Official\Accounts\Requests\PasswordPostRequest;

class PasswordUpdateController extends Controller
{

    public function __construct(private EmployeeService $employeeService, private ProfileService $profileService){}

    public function index(PasswordPostRequest $request)
    {
        try {
            //code...
            $employee = $this->profileService->profile(Guards::Admin->value());
            $this->employeeService->update(
                $request->safe()->only('password'),
                $employee
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
