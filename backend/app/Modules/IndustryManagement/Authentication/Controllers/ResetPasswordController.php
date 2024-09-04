<?php

namespace App\Modules\IndustryManagement\Authentication\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Services\RateLimitService;
use App\Modules\IndustryManagement\Authentication\Requests\ResetPasswordPostRequest;
use App\Modules\IndustryManagement\Authentication\Services\AuthService;


class ResetPasswordController extends Controller
{
    public function __construct(private AuthService $authService){}

    public function index(ResetPasswordPostRequest $request, $token){
        //code...
        if (! $request->hasValidSignature(false)) {
            $this->authService->deletePasswordResetLink($token);
            return response()->json([
                'message' => "Reset password link has expired.",
            ], 400);
        }
        $data = $this->authService->getPasswordResetLink($token);
        if($data){
            if($data->created_at->diffInMinutes(now()) < (int)config('auth.reset_password_link_timeout')){
                $user = $data->user;
                if($user->otp == $request->otp){
                    $this->authService->update($user, ['otp' => rand (1111, 9999), 'password' => $request->password]);
                    $this->authService->deletePasswordResetLink($token);
                    (new RateLimitService($request))->clearRateLimit();
                    return response()->json([
                        'message' => "Password reset successfully.",
                    ], 200);
                }
                return response()->json([
                    'message' => "Invalid otp.",
                ], 400);
            }
            $this->authService->deletePasswordResetLink($token);
        }
        return response()->json([
            'message' => "Reset password link has expired.",
        ], 400);

    }
}
