<?php

namespace App\Modules\CourseManagement\Courses\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\CourseManagement\Courses\Resources\CourseCollection;
use App\Modules\CourseManagement\Courses\Services\CourseService;

class CourseAllController extends Controller
{
    private $courseService;

    public function __construct(CourseService $courseService)
    {
        $this->courseService = $courseService;
    }

    public function index(){
        $course = $this->courseService->all();
        return response()->json(["message" => "Course fetched successfully.", "data" => CourseCollection::collection($course)], 200);
    }
}
