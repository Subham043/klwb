<?php

namespace App\Modules\Authentication\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Services\RateLimitService;
use App\Modules\Users\Models\User;
use App\Modules\Authentication\Requests\ResetPasswordViaEmailPostRequest;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Str;
use Illuminate\Auth\Events\PasswordReset;


class ResetPasswordViaEmailController extends Controller
{
    public function index(ResetPasswordViaEmailPostRequest $request, $token){
        //code...
        $status = Password::reset(
            [...$request->safe()->only('email', 'otp', 'password', 'password_confirmation'), 'is_blocked' => 0, 'token' => $token],
            function (User $user, string $password) {
                $user->forceFill([
                    'password' => $password,
                    'otp' => rand (1111, 9999),
                ])->setRememberToken(Str::random(60));

                $user->save();

                event(new PasswordReset($user));
            }
        );
        if($status === Password::PASSWORD_RESET){
            (new RateLimitService($request))->clearRateLimit();
            return response()->json([
                'message' => __($status),
            ], 200);
        }
        if($status === Password::INVALID_TOKEN){
            (new RateLimitService($request))->clearRateLimit();
            return response()->json([
                'message' => __($status),
            ], 400);
        }
        if($status === Password::INVALID_USER){
            (new RateLimitService($request))->clearRateLimit();
            return response()->json([
                'message' => "Either the user doesn't exist or the otp is invalid.",
            ], 400);
        }
        return response()->json([
            'message' => __($status),
        ], 400);

    }
}