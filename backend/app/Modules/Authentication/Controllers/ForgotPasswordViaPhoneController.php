<?php

namespace App\Modules\Authentication\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Services\RateLimitService;
use App\Modules\Authentication\Jobs\ResetPasswordMailJob;
use App\Modules\Authentication\Requests\ForgotPasswordViaPhonePostRequest;
use Illuminate\Support\Facades\Password;

class ForgotPasswordViaPhoneController extends Controller
{
    private ?string $token = null;

    public function index(ForgotPasswordViaPhonePostRequest $request){

        $status = Password::sendResetLink(
            [...$request->safe()->only('phone'), 'is_blocked' => 0],
            function ($user, $token) {
                $user->update(['otp' => rand (1111, 9999)]);
                $this->token = $token;
                dispatch(new ResetPasswordMailJob($user, $token));
            }
        );
        if($status === Password::RESET_LINK_SENT){
            (new RateLimitService($request))->clearRateLimit();
            return response()->json([
                'message' => __($status),
                'token' => $this->token
            ], 200);
        }
        return response()->json([
            'message' => __($status),
        ], 400);
    }
}