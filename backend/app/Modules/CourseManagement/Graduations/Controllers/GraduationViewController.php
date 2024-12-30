<?php

namespace App\Modules\CourseManagement\Graduations\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\CourseManagement\Graduations\Resources\GraduationCollection;
use App\Modules\CourseManagement\Graduations\Services\GraduationService;

class GraduationViewController extends Controller
{
    public function __construct(private GraduationService $graduationService){}

    /**
     * Get a graduation by id
     *
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function index($id){
        $graduation = $this->graduationService->getById($id);
        return response()->json(["message" => "Graduation fetched successfully.", "data" => GraduationCollection::make($graduation)], 200);
    }
}
