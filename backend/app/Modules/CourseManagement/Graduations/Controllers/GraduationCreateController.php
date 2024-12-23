<?php

namespace App\Modules\CourseManagement\Graduations\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\CourseManagement\Graduations\Requests\GraduationRequest;
use App\Modules\CourseManagement\Graduations\Resources\GraduationCollection;
use App\Modules\CourseManagement\Graduations\Services\GraduationService;

class GraduationCreateController extends Controller
{
    public function __construct(private GraduationService $graduationService){}

/**
 * Handle the incoming request to create a new graduation.
 *
 * @param GraduationRequest $request
 * @return \Illuminate\Http\JsonResponse
 *
 * @OA\Post(
 *     path="/api/v1/graduations",
 *     tags={"Graduation"},
 *     summary="Create a new graduation",
 *     description="Create a new graduation in the system",
 *     @OA\RequestBody(
 *         required=true,
 *         @OA\JsonContent(ref="#/components/schemas/GraduationRequest")
 *     ),
 *     @OA\Response(response=201, description="Graduation created successfully"),
 *     @OA\Response(response=400, description="Something went wrong. Please try again"),
 *     security={{"bearer": {}}}
 * )
 */

    public function index(GraduationRequest $request){
        try {
            //code...
            $graduation = $this->graduationService->create(
                [...$request->validated(), 'is_active' => 1]
            );
            return response()->json(["message" => "Graduation created successfully.", "data" => GraduationCollection::make($graduation)], 201);
        } catch (\Throwable $th) {
            return response()->json(["message" => "Something went wrong. Please try again"], 400);
        }

    }
}
