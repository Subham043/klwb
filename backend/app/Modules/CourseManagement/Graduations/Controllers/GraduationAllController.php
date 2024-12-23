<?php

namespace App\Modules\CourseManagement\Graduations\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\CourseManagement\Graduations\Resources\GraduationCollection;
use App\Modules\CourseManagement\Graduations\Services\GraduationService;

class GraduationAllController extends Controller
{
    public function __construct(private GraduationService $graduationService){}

    /**
     * @OA\Get(
     *     path="/api/v1/graduations",
     *     tags={"Graduation"},
     *     summary="Get all graduations",
     *     description="Get all graduation",
     *     @OA\Response(response=200, description="Successful response"),
     *     security={{"bearer": {}}}
     * )
     */
    public function index(){
        $graduation = $this->graduationService->all();
        return response()->json(["message" => "Graduation fetched successfully.", "data" => GraduationCollection::collection($graduation)], 200);
    }
}
