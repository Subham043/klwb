<?php

namespace App\Modules\Courses\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Courses\Requests\CourseRequest;
use App\Modules\Courses\Resources\CourseCollection;
use App\Modules\Courses\Services\CourseService;

class CourseCreateController extends Controller
{
    private $courseService;

    public function __construct(CourseService $courseService)
    {
        $this->courseService = $courseService;
    }

    public function index(CourseRequest $request){
        try {
            //code...
            $course = $this->courseService->create(
                $request->validated()
            );
            return response()->json(["message" => "Course created successfully.", "data" => CourseCollection::make($course)], 201);
        } catch (\Throwable $th) {
            return response()->json(["message" => "Something went wrong. Please try again"], 400);
        }

    }
}