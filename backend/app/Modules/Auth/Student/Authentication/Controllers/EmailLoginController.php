<?php

namespace App\Modules\Auth\Student\Authentication\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Enums\Guards;
use App\Http\Services\RateLimitService;
use App\Modules\Auth\Common\Requests\EmailLoginPostRequest;
use App\Modules\Auth\Common\Resources\AuthCollection;
use App\Modules\Auth\Student\Authentication\Services\AuthService;

class EmailLoginController extends Controller
{
    public function __construct(private AuthService $authService){}

    public function index(EmailLoginPostRequest $request){

        $is_authenticated = $this->authService->login([...$request->safe()->except(['captcha']), 'is_blocked' => 0], Guards::Web->value());

        if ($is_authenticated) {
            (new RateLimitService($request))->clearRateLimit();
            $user = auth()->guard(Guards::Web->value())->user();
            $token = $this->authService->generate_token($user);
            return response()->json([
                'message' => 'Logged in successfully.',
                'token_type' => 'Bearer',
                'token' => $token,
                'user' => AuthCollection::make($user)
            ], 200);
        }
        return response()->json([
            'message' => 'Oops! You have entered invalid credentials',
        ], 400);
    }
}
