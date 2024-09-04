<?php

namespace App\Modules\Auth\Official\Accounts\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Enums\Guards;
use App\Http\Services\RateLimitService;
use App\Modules\Admins\Employees\Services\EmployeeService;
use App\Modules\Auth\Common\Resources\ProfileCollection;
use App\Modules\Auth\Official\Accounts\Requests\ProfilePostRequest;
use App\Modules\Auth\Official\Accounts\Services\ProfileService;

class ProfileUpdateController extends Controller
{

    public function __construct(private ProfileService $profileService, private EmployeeService $employeeService){}

    public function index(ProfilePostRequest $request){

        $email_status = false;
        $phone_status = false;
        try {
            //code...
            $employee = $this->profileService->profile(Guards::Admin->value());
            if($employee->email != $request->email) {
                $email_status = true;
            }
            if($employee->phone != $request->phone) {
                $phone_status = true;
            }
            $updated_user = $this->employeeService->update(
                $request->validated(),
                $employee
            );
            if ($email_status || $phone_status) {
                $updated_user->verified_at = null;
                $updated_user->save();
            }

            (new RateLimitService($request))->clearRateLimit();
            return response()->json([
                'profile' => ProfileCollection::make(auth()->guard(Guards::Admin->value())->user()),
                'message' => "Profile Updated successfully.",
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => "something went wrong. Please try again.",
            ], 400);
        }

    }
}
