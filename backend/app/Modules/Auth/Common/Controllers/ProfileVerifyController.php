<?php

namespace App\Modules\Auth\Common\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Services\RateLimitService;
use App\Modules\Auth\Common\Resources\ProfileCollection;
use App\Modules\Auth\Common\Requests\ProfileVerifyPostRequest;

class ProfileVerifyController extends Controller
{

    /**
     * @OA\Post(
     *     path="/api/auth/profile/verify",
     *     summary="Verify Profile",
     *     description="Verify Profile",
     *     tags={"Profile"},
     *     security={{"bearer_token":{}}},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(ref="#/components/schemas/ProfileVerifyPostRequest")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Profile Verified successfully.",
     *         @OA\JsonContent(ref="#/components/schemas/ProfileCollection")
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="something went wrong. Please try again.",
     *     )
     * )
     */
    public function index(ProfileVerifyPostRequest $request){

        try {
            //code...
            $request->user()->update(
                [
                    'verified_at' => now(),
                    'otp' => rand(1111, 9999),
                ],
            );

            (new RateLimitService($request))->clearRateLimit();
            return response()->json([
                'profile' => ProfileCollection::make($request->user()),
                'message' => "Profile Verified successfully.",
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => "something went wrong. Please try again.",
            ], 400);
        }

    }
}
