<?php

namespace App\Modules\Accounts\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Authentication\Jobs\OtpMailJob;
use Illuminate\Http\Request;

class ResendRegisteredUserOtpController extends Controller
{
    public function index(Request $request){
        if($request->user()->hasVerifiedEmail()){
            return response()->json([
                'message' => 'Oops! you are already a verified user.',
            ], 400);
        }
        $request->user()->update([
            'otp' => rand (1111, 9999)
        ]);
        dispatch(new OtpMailJob($request->user()));
        return response()->json([
            'message' => 'Otp sent successfully.',
        ], 200);
    }

}