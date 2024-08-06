<?php

namespace App\Modules\Admins\Authentication\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Events\ForgotPassword;
use App\Http\Services\RateLimitService;
use App\Modules\Admins\Authentication\Requests\ForgotPasswordViaPhonePostRequest;
use App\Modules\Admins\Authentication\Services\AuthService;
use Illuminate\Support\Facades\URL;

class ForgotPasswordViaPhoneController extends Controller
{
    private $authService;

    public function __construct(AuthService $authService)
    {
        $this->authService = $authService;
    }

    public function index(ForgotPasswordViaPhonePostRequest $request){
        $employee = $this->authService->getByPhone($request->phone);
        $this->authService->updateEmployee($employee, ['otp' => rand (1111, 9999)]);
        $uuid = str()->uuid();
        $this->authService->setPasswordResetLink(['employee_id' => $employee->id, 'uuid' => $uuid]);
        $signedUrl = URL::temporarySignedRoute(
            'admin-reset-password', now()->addMinutes((int)config('auth.reset_password_link_timeout')), ['token' => $uuid], absolute: false
        );
        $param = str_replace('/api/admin/v1/auth/reset-password/', '', $signedUrl);
        ForgotPassword::dispatch($employee, $param);
        (new RateLimitService($request))->clearRateLimit();
        return response()->json([
            'message' => "We have e-mailed your password reset link and the otp. The link is valid for ".config('auth.reset_password_link_timeout')." minutes.",
            'param' => $param,
        ], 200);
    }
}
