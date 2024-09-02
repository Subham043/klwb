<?php

namespace App\Modules\Admins\Accounts\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Enums\Guards;
use App\Http\Services\RateLimitService;
use App\Modules\Admins\Accounts\Services\ProfileService;
use App\Modules\Admins\Accounts\Requests\PasswordPostRequest;
use App\Modules\Admins\Employees\Services\EmployeeService;

class PasswordUpdateController extends Controller
{
    private $employeeService;
    private $profileService;

    public function __construct(EmployeeService $employeeService, ProfileService $profileService)
    {
        $this->employeeService = $employeeService;
        $this->profileService = $profileService;
    }

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
