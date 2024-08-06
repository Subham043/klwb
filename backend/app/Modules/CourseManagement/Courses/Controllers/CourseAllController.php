<?php

namespace App\Modules\CourseManagement\Courses\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\CourseManagement\Courses\Resources\CourseCollection;
use App\Modules\CourseManagement\Courses\Services\CourseService;
use Illuminate\Http\Request;

class CourseAllController extends Controller
{
    private $courseService;

    public function __construct(CourseService $courseService)
    {
        $this->courseService = $courseService;
    }

    public function index(Request $request){
        $course = $this->courseService->all($request->graduation_id ?? null);
        return response()->json(["message" => "Course fetched successfully.", "data" => CourseCollection::collection($course)], 200);
    }
}
