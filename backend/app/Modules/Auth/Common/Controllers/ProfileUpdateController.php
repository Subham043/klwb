<?php

namespace App\Modules\Auth\Common\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Services\RateLimitService;
use App\Modules\Auth\Common\Resources\ProfileCollection;
use App\Modules\Auth\Common\Requests\ProfilePostRequest;

class ProfileUpdateController extends Controller
{

    /**
     * @OA\Post(
     *     path="/api/auth/profile/update",
     *     summary="Update Profile",
     *     description="Update Profile",
     *     tags={"Profile"},
     *     security={{"bearer_token":{}}},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(ref="#/components/schemas/ProfilePostRequest")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Profile Updated successfully.",
     *         @OA\JsonContent(ref="#/components/schemas/ProfileCollection")
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="something went wrong. Please try again.",
     *     )
     * )
     */
    public function index(ProfilePostRequest $request){

        $email_status = false;
        $phone_status = false;
        try {
            //code...
            $user = $request->user();
            if($user->email != $request->email) {
                $email_status = true;
            }
            if($user->phone != $request->phone) {
                $phone_status = true;
            }
            $user->update(
                [
                    ...$request->validated(),
                    'verified_at' => ($email_status || $phone_status) ? null : $user->verified_at
                ]
            );
            (new RateLimitService($request))->clearRateLimit();
            return response()->json([
                'profile' => ProfileCollection::make($request->user()),
                'message' => "Profile Updated successfully.",
            ], 200);
        } catch (\Throwable $th) {
            throw $th;
            return response()->json([
                'message' => "something went wrong. Please try again.",
            ], 400);
        }

    }
}
