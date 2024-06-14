<?php

namespace App\Modules\Authentication\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Services\RateLimitService;
use App\Modules\Authentication\Requests\LoginPostRequest;
use App\Modules\Authentication\Resources\AuthCollection;
use App\Modules\Authentication\Services\AuthService;

class LoginController extends Controller
{
    private $authService;

    public function __construct(AuthService $authService)
    {
        $this->authService = $authService;
    }

    public function index(LoginPostRequest $request){

        $is_authenticated = $this->authService->login($request->validated());

        if ($is_authenticated) {
            (new RateLimitService($request))->clearRateLimit();
            $token = $this->authService->generate_token(auth()->user());
            return response()->json([
                'message' => 'Logged in successfully.',
                'token_type' => 'Bearer',
                'token' => $token,
                'user' => AuthCollection::make(auth()->user()),
            ], 200);
        }
        return response()->json([
            'message' => 'Oops! You have entered invalid credentials',
        ], 400);
    }
}
