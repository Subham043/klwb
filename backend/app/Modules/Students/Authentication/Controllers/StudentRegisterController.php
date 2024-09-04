<?php

namespace App\Modules\Students\Authentication\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Events\UserRegistered;
use App\Http\Services\RateLimitService;
use App\Modules\Students\Authentication\Requests\StudentRegisterPostRequest;
use App\Modules\Students\Authentication\Resources\AuthCollection;
use App\Modules\Students\Users\Services\UserService;
use Illuminate\Support\Facades\DB;

class StudentRegisterController extends Controller
{
    public function __construct(private UserService $userService){}

    public function index(StudentRegisterPostRequest $request){

        DB::beginTransaction();
        try {
            //code...
            $user = $this->userService->create([...$request->safe()->except(['captcha'])]);
            $this->userService->syncRoles(["Student"], $user);
            UserRegistered::dispatch($user);
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
