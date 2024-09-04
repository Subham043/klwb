<?php

namespace App\Modules\CourseManagement\Graduations\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\CourseManagement\Graduations\Resources\GraduationCollection;
use App\Modules\CourseManagement\Graduations\Services\GraduationService;

class GraduationAllController extends Controller
{
    public function __construct(private GraduationService $graduationService){}

    public function index(){
        $graduation = $this->graduationService->all();
        return response()->json(["message" => "Graduation fetched successfully.", "data" => GraduationCollection::collection($graduation)], 200);
    }
}
