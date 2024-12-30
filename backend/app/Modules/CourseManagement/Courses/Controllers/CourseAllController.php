<?php

namespace App\Modules\CourseManagement\Courses\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\CourseManagement\Courses\Resources\CourseCollection;
use App\Modules\CourseManagement\Courses\Services\CourseService;

class CourseAllController extends Controller
{
    public function __construct(private CourseService $courseService){}

    /**
     * Fetch all courses.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(){
        $course = $this->courseService->all();
        return response()->json(["message" => "Course fetched successfully.", "data" => CourseCollection::collection($course)], 200);
    }
}
