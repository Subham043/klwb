<?php

namespace App\Modules\InstituteManagement\Accounts\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Services\RateLimitService;
use App\Modules\InstituteManagement\Accounts\Requests\ProfilePostRequest;
use App\Modules\InstituteManagement\Accounts\Resources\ProfileCollection;
use App\Modules\InstituteManagement\Accounts\Services\ProfileService;
use App\Modules\InstituteManagement\Institutes\Services\InstituteAuthService;

class ProfileUpdateController extends Controller
{
    private $profileService;
    private $instituteAuthService;

    public function __construct(ProfileService $profileService, InstituteAuthService $instituteAuthService)
    {
        $this->profileService = $profileService;
        $this->instituteAuthService = $instituteAuthService;
    }

    public function index(ProfilePostRequest $request){

        $email_status = false;
        $phone_status = false;
        try {
            //code...
            $user = $this->profileService->profile();
            if($user->email != $request->email) {
                $email_status = true;
            }
            if($user->phone != $request->phone) {
                $phone_status = true;
            }
            $updated_user = $this->instituteAuthService->update(
                $request->validated(),
                $user
            );
            if ($email_status || $phone_status) {
                $updated_user->verified_at = null;
                $updated_user->save();
                // $updated_user->sendEmailVerificationNotification();
            }

            (new RateLimitService($request))->clearRateLimit();
            return response()->json([
                'profile' => ProfileCollection::make(auth()->user()),
                'message' => "Profile Updated successfully.",
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => "something went wrong. Please try again.",
            ], 400);
        }

    }
}
