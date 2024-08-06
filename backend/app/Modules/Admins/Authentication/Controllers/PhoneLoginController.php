<?php

namespace App\Modules\Admins\Authentication\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Services\RateLimitService;
use App\Modules\Admins\Authentication\Requests\PhoneLoginPostRequest;
use App\Modules\Admins\Authentication\Resources\AuthCollection;
use App\Modules\Admins\Authentication\Services\AuthService;

class PhoneLoginController extends Controller
{
    private $authService;

    public function __construct(AuthService $authService)
    {
        $this->authService = $authService;
    }

    public function index(PhoneLoginPostRequest $request){

        $is_authenticated = $this->authService->login([...$request->safe()->except(['captcha']), 'is_blocked' => 0]);

        if ($is_authenticated) {
            (new RateLimitService($request))->clearRateLimit();
            $employee = auth()->user();
            $token = $this->authService->generate_token($employee);
            return response()->json([
                'message' => 'Logged in successfully.',
                'token_type' => 'Bearer',
                'token' => $token,
                'user' => AuthCollection::make($employee),
            ], 200);
        }
        return response()->json([
            'message' => 'Oops! You have entered invalid credentials',
        ], 400);
    }
}
