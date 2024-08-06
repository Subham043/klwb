<?php

namespace App\Modules\Students\Authentication\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Students\Authentication\Events\ResetPasswordResendOtp;
use App\Modules\Students\Authentication\Services\AuthService;

class ResetPasswordResendOtpController extends Controller
{
    private $authService;

    public function __construct(AuthService $authService)
    {
        $this->authService = $authService;
    }

    public function index($token){
        //code...
        $data = $this->authService->getPasswordResetLink($token);
        if($data){
            if($data->created_at->diffInMinutes(now()) < (int)config('auth.reset_password_link_timeout')){
                $user = $data->user;
                $this->authService->updateUser($user, ['otp' => rand (1111, 9999)]);
                ResetPasswordResendOtp::dispatch($user);
                return response()->json([
                    'message' => "Otp sent successfully.",
                ], 200);
            }
            $this->authService->deletePasswordResetLink($token);
        }
        return response()->json([
            'message' => "Reset password link has expired.",
        ], 400);

    }
}
