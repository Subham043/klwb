<?php

namespace App\Modules\Auth\Student\Authentication\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Services\RateLimitService;
use App\Modules\Auth\Common\Resources\AuthCollection;
use App\Modules\Auth\Student\Authentication\Requests\StudentRegisterPostRequest;
use App\Modules\Auth\Student\Authentication\Services\AuthService;
use App\Modules\Students\Users\Services\UserService;
use Illuminate\Support\Facades\DB;

class StudentRegisterController extends Controller
{
    public function __construct(private UserService $userService, private AuthService $authService){}

    public function index(StudentRegisterPostRequest $request){

        DB::beginTransaction();
        try {
            //code...
            $user = $this->authService->register([...$request->safe()->except(['captcha'])]);
            (new RateLimitService($request))->clearRateLimit();
            return response()->json([
                'message' => 'Thanks for signing up! Before getting started, could you verify your email address by clicking on the link we just emailed to you? If you didn\'t receive the email, we will gladly send you another.',
                'user' => AuthCollection::make($user),
            ], 201);
        } catch (\Throwable $th) {
            DB::rollBack();
            return response()->json(["message" => "Something went wrong. Please try again"], 400);
        } finally {
            DB::commit();
        }
    }
}
