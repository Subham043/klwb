<?php

namespace App\Modules\CourseManagement\Courses\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\CourseManagement\Courses\Requests\CourseRequest;
use App\Modules\CourseManagement\Courses\Resources\CourseCollection;
use App\Modules\CourseManagement\Courses\Services\CourseService;

class CourseUpdateController extends Controller
{
    public function __construct(private CourseService $courseService){}

    public function index(CourseRequest $request, $id){
        $course = $this->courseService->getById($id);
        try {
            //code...
            $this->courseService->update(
                $request->validated(),
                $course
            );
            return response()->json(["message" => "Course updated successfully.", "data" => CourseCollection::make($course)], 200);
        } catch (\Throwable $th) {
            return response()->json(["message" => "Something went wrong. Please try again"], 400);
        }

    }
}
