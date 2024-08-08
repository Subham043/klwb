<?php

namespace App\Modules\InstituteManagement\Authentication\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Events\ForgotPassword;
use App\Http\Services\RateLimitService;
use App\Modules\InstituteManagement\Authentication\Requests\ForgotPasswordViaEmailPostRequest;
use App\Modules\InstituteManagement\Authentication\Services\AuthService;
use Illuminate\Support\Facades\URL;

class ForgotPasswordViaEmailController extends Controller
{
    private $authService;

    public function __construct(AuthService $authService)
    {
        $this->authService = $authService;
    }

    public function index(ForgotPasswordViaEmailPostRequest $request){
        $user = $this->authService->getByEmail($request->email);
        $this->authService->updateInstituteAuth($user, ['otp' => rand (1111, 9999)]);
        $uuid = str()->uuid();
        $this->authService->setPasswordResetLink(['school_auth_id' => $user->id, 'uuid' => $uuid]);
        $signedUrl = URL::temporarySignedRoute(
            'institute-reset-password', now()->addMinutes((int)config('auth.reset_password_link_timeout')), ['token' => $uuid], absolute: false
        );
        $param = str_replace('/api/institute/v1/auth/reset-password/', '', $signedUrl);
        ForgotPassword::dispatch($user, $param);
        (new RateLimitService($request))->clearRateLimit();
        return response()->json([
            'message' => "We have e-mailed your password reset link and the otp. The link is valid for ".config('auth.reset_password_link_timeout')." minutes.",
            'param' => $param,
        ], 200);
    }
}
