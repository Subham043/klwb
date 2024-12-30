<?php

namespace App\Modules\CourseManagement\Courses\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\CourseManagement\Courses\Requests\CourseRequest;
use App\Modules\CourseManagement\Courses\Resources\CourseCollection;
use App\Modules\CourseManagement\Courses\Services\CourseService;

class CourseCreateController extends Controller
{
    public function __construct(private CourseService $courseService){}

    /**
     * Create a new course in storage.
     *
     * @param  \App\Modules\CourseManagement\Courses\Requests\CourseRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function index(CourseRequest $request){
        try {
            //code...
            $course = $this->courseService->create(
                [...$request->validated(), 'is_active' => 1]
            );
            return response()->json(["message" => "Course created successfully.", "data" => CourseCollection::make($course)], 201);
        } catch (\Throwable $th) {
            return response()->json(["message" => "Something went wrong. Please try again"], 400);
        }

    }
}
