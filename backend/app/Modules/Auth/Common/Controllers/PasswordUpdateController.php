<?php

namespace App\Modules\Auth\Common\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Services\RateLimitService;
use App\Modules\Auth\Common\Requests\PasswordPostRequest;

class PasswordUpdateController extends Controller
{
    public function index(PasswordPostRequest $request)
    {
        try {
            //code...
            $request->user()->update($request->safe()->only('password'));
            (new RateLimitService($request))->clearRateLimit();
            return response()->json([
                'message' => "Password Updated successfully.",
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => "something went wrong. Please try again",
            ], 400);
        }

    }
}