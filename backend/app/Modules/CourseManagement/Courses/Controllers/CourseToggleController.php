<?php

namespace App\Modules\CourseManagement\Courses\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\ToggleStatusRequest;
use App\Modules\CourseManagement\Courses\Resources\CourseCollection;
use App\Modules\CourseManagement\Courses\Services\CourseService;

class CourseToggleController extends Controller
{
    public function __construct(private CourseService $courseService){}

    /**
     * Toggle the status of a course.
     * 
     * @param ToggleStatusRequest $request
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function index(ToggleStatusRequest $request, $id){
        $course = $this->courseService->getById($id);
        try {
            //code...
            $this->courseService->toggleStatus($course);
            if($course->is_active){
                return response()->json(["message" => "Course unblocked successfully.", "data" => CourseCollection::make($course)], 200);
            }
            return response()->json(["message" => "Course blocked successfully.", "data" => CourseCollection::make($course)], 200);
        } catch (\Throwable $th) {
            return response()->json(["message" => "Something went wrong. Please try again"], 400);
        }

    }
}
