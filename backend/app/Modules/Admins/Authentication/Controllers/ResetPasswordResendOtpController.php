<?php

namespace App\Modules\Admins\Authentication\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Events\ResetPasswordResendOtp;
use App\Modules\Admins\Authentication\Services\AuthService;

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
                $employee = $data->employee;
                $this->authService->updateEmployee($employee, ['otp' => rand (1111, 9999)]);
                ResetPasswordResendOtp::dispatch($employee);
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
