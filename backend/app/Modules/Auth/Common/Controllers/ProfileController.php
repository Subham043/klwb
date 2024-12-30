<?php

namespace App\Modules\Auth\Common\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Auth\Common\Resources\ProfileCollection;
use Illuminate\Http\Request;

class ProfileController extends Controller
{
    /**
     * @OA\Get(
     *     path="/api/v1/profile",
     *     summary="Get Profile",
     *     tags={"Profile"},
     *     security={{"bearer_token":{}}},
     *     @OA\Response(
     *         response=200,
     *         description="successful operation",
     *         @OA\JsonContent(
     *             @OA\Property(
     *                 property="profile",
     *                 type="object",
     *                 ref="#/components/schemas/ProfileResource"
     *             )
     *         )
     *     )
     * )
     */
    public function index(Request $request){
        return response()->json([
            'profile' => ProfileCollection::make($request->user()),
        ], 200);
    }
}
