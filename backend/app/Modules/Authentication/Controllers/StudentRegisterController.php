<?php

namespace App\Modules\Authentication\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Services\RateLimitService;
use App\Modules\Authentication\Requests\StudentRegisterPostRequest;
use App\Modules\Authentication\Resources\AuthCollection;
use App\Modules\Users\Services\UserService;

class StudentRegisterController extends Controller
{
    private UserService $userService;

    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }

    public function index(StudentRegisterPostRequest $request){

        $user = $this->userService->create($request->safe()->except(['captcha']));

        (new RateLimitService($request))->clearRateLimit();
        return response()->json([
            'message' => 'Thanks for signing up! Before getting started, could you verify your email address by clicking on the link we just emailed to you? If you didn\'t receive the email, we will gladly send you another.',
            'user' => AuthCollection::make($user),
        ], 201);
    }
}
