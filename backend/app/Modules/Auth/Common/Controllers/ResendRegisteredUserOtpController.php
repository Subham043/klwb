<?php

namespace App\Modules\Auth\Common\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Events\ResendOtp;
use Illuminate\Http\Request;

class ResendRegisteredUserOtpController extends Controller
{
    /**
     * Resend OTP for registered user
     *
     * @OA\POST(
     *     path="/api/v1/auth/resend-otp",
     *     summary="Resend OTP for registered user",
     *     description="Resend OTP for registered user",
     *     tags={"Auth"},
     *     @OA\Response(response=200, description="Otp sent successfully"),
     *     @OA\Response(response=400, description="Oops! you are already a verified user"),
     * )
     */
	public function index(Request $request)
	{
		if ($request->user()->hasVerifiedEmail()) {
			return response()->json([
				'message' => 'Oops! you are already a verified user.',
			], 400);
		}
		$request->user()->update([
			'otp' => rand(1111, 9999)
		]);
		try {
			//code...
			ResendOtp::dispatch($request->user());
		} catch (\Throwable $th) {
			throw $th;
		}
		return response()->json([
			'message' => 'Otp sent successfully.',
		], 200);
	}
}
