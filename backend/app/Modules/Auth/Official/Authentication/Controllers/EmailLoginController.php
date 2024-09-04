<?php

namespace App\Modules\Auth\Official\Authentication\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Enums\Guards;
use App\Http\Services\RateLimitService;
use App\Modules\Auth\Common\Requests\EmailLoginPostRequest;
use App\Modules\Auth\Common\Resources\AuthCollection;
use App\Modules\Auth\Official\Authentication\Services\AuthService;

class EmailLoginController extends Controller
{

    public function __construct(private AuthService $authService){}

    public function index(EmailLoginPostRequest $request){

        $is_authenticated = $this->authService->login([...$request->safe()->except(['captcha']), 'is_blocked' => 0], Guards::Admin->value());
        if ($is_authenticated) {
            (new RateLimitService($request))->clearRateLimit();
            $employee = auth()->guard(Guards::Admin->value())->user();
            $token = $this->authService->generate_token($employee);
            return response()->json([
                'message' => 'Logged in successfully.',
                'token_type' => 'Bearer',
                'token' => $token,
                'user' => AuthCollection::make($employee)
            ], 200);
        }
        return response()->json([
            'message' => 'Oops! You have entered invalid credentials'
        ], 400);
    }
}
