<?php

namespace App\Modules\Courses\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Courses\Resources\CourseCollection;
use App\Modules\Courses\Services\CourseService;

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