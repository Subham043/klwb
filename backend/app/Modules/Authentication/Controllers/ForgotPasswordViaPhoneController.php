<?php

namespace App\Modules\Authentication\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Services\RateLimitService;
use App\Modules\Authentication\Requests\ForgotPasswordViaPhonePostRequest;
use Illuminate\Support\Facades\Password;

class ForgotPasswordViaPhoneController extends Controller
{

    public function index(ForgotPasswordViaPhonePostRequest $request){

        // $status = Password::sendResetLink(
        //     $request->safe()->only('email')
        // );
        // if($status === Password::RESET_LINK_SENT){
        //     (new RateLimitService($request))->clearRateLimit();
        //     return response()->json([
        //         'message' => __($status),
        //     ], 200);
        // }
        return response()->json([
            'message' => 'Done',
        ], 200);
    }
}