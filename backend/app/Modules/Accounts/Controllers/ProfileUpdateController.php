<?php

namespace App\Modules\Accounts\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Services\RateLimitService;
use App\Modules\Accounts\Requests\ProfilePostRequest;
use App\Modules\Accounts\Resources\ProfileCollection;
use App\Modules\Accounts\Services\ProfileService;
use App\Modules\Users\Services\UserService;

class ProfileUpdateController extends Controller
{
    private $profileService;
    private $userService;

    public function __construct(ProfileService $profileService, UserService $userService)
    {
        $this->profileService = $profileService;
        $this->userService = $userService;
    }

    public function index(ProfilePostRequest $request){

        $email_status = false;
        try {
            //code...
            $user = $this->profileService->profile();
            if($user->email != $request->email) {
                $email_status = true;
            }
            $updated_user = $this->userService->update(
                $request->validated(),
                $user
            );
            if ($email_status) {
                $updated_user->email_verified_at = null;
                $updated_user->save();
                $updated_user->sendEmailVerificationNotification();
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