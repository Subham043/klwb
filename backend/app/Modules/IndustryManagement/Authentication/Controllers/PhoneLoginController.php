<?php

namespace App\Modules\IndustryManagement\Authentication\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Enums\Guards;
use App\Http\Services\RateLimitService;
use App\Modules\IndustryManagement\Authentication\Requests\PhoneLoginPostRequest;
use App\Modules\IndustryManagement\Authentication\Resources\AuthCollection;
use App\Modules\IndustryManagement\Authentication\Services\AuthService;

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
            $user = auth()->guard(Guards::Industry->value())->user();
            $token = $this->authService->generate_token($user);
            return response()->json([
                'message' => 'Logged in successfully.',
                'token_type' => 'Bearer',
                'token' => $token,
                'user' => AuthCollection::make($user),
            ], 200);
        }
        return response()->json([
            'message' => 'Oops! You have entered invalid credentials',
        ], 400);
    }
}
