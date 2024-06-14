<?php

namespace App\Modules\Authentication\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Services\RateLimitService;
use App\Modules\Authentication\Requests\ForgotPasswordPostRequest;
use Illuminate\Support\Facades\Password;

class ForgotPasswordController extends Controller
{

    public function index(ForgotPasswordPostRequest $request){

        $status = Password::sendResetLink(
            $request->safe()->only('email')
        );
        if($status === Password::RESET_LINK_SENT){
            (new RateLimitService($request))->clearRateLimit();
            return response()->json([
                'message' => __($status),
            ], 200);
        }
        return response()->json([
            'message' => __($status),
        ], 400);
    }
}
