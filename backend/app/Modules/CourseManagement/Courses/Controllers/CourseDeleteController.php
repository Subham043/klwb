<?php

namespace App\Modules\CourseManagement\Courses\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\CourseManagement\Courses\Resources\CourseCollection;
use App\Modules\CourseManagement\Courses\Services\CourseService;

class CourseDeleteController extends Controller
{
    public function __construct(private CourseService $courseService){}

    /**
     * Delete a course by its ID.
     *
     * @param int $id The ID of the course to delete.
     * @return \Illuminate\Http\JsonResponse The response indicating the outcome of the delete operation.
     */

    public function index($id){
        $course = $this->courseService->getById($id);

        try {
            //code...
            $this->courseService->delete(
                $course
            );
            return response()->json(["message" => "Course deleted successfully.", "data" => CourseCollection::make($course)], 200);
        } catch (\Throwable $th) {
            return response()->json(["message" => "Something went wrong. Please try again"], 400);
        }
    }

}
