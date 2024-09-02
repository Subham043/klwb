<?php

namespace App\Modules\Students\Authentication\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Services\RateLimitService;
use App\Http\Events\ForgotPassword;
use App\Modules\Students\Authentication\Requests\ForgotPasswordViaPhonePostRequest;
use App\Modules\Students\Authentication\Services\AuthService;
use Illuminate\Support\Facades\URL;

class ForgotPasswordViaPhoneController extends Controller
{
    private $authService;

    public function __construct(AuthService $authService)
    {
        $this->authService = $authService;
    }

    public function index(ForgotPasswordViaPhonePostRequest $request){
        $user = $this->authService->getByPhone($request->phone);
        $this->authService->update($user, ['otp' => rand (1111, 9999)]);
        $uuid = str()->uuid();
        $this->authService->setPasswordResetLink(['user_id' => $user->id, 'uuid' => $uuid]);
        $signedUrl = URL::temporarySignedRoute(
            'reset-password', now()->addMinutes((int)config('auth.reset_password_link_timeout')), ['token' => $uuid], absolute: false
        );
        $param = str_replace('/api/v1/auth/reset-password/', '', $signedUrl);
        ForgotPassword::dispatch($user, $param);
        (new RateLimitService($request))->clearRateLimit();
        return response()->json([
            'message' => "We have e-mailed your password reset link and the otp. The link is valid for ".config('auth.reset_password_link_timeout')." minutes.",
            'param' => $param,
        ], 200);
    }
}
