<?php

namespace App\Modules\CourseManagement\Graduations\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\CourseManagement\Graduations\Resources\GraduationCollection;
use App\Modules\CourseManagement\Graduations\Services\GraduationService;
use Illuminate\Http\Request;

class GraduationPaginateController extends Controller
{
    public function __construct(private GraduationService $graduationService){}

    /**
     * @OA\Get(
     *     path="/api/v1/graduations/paginate",
     *     tags={"Graduation"},
     *     summary="Get all graduations with paginated",
     *     description="Get all graduation with paginated",
     *     security={{"bearer": {}}},
     *     @OA\Parameter(
     *         description="total",
     *         in="query",
     *         name="total",
     *         required=false,
     *         example=10,
     *         @OA\Schema(
     *             type="integer",
     *             format="int32"
     *         )
     *     ),
     *     @OA\Response(response=200, description="Successful response"),
     * )
     */
    public function index(Request $request){
        $data = $this->graduationService->paginate($request->total ?? 10);
        return GraduationCollection::collection($data);
    }

}
