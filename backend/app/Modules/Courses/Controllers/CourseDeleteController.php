<?php

namespace App\Modules\Courses\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Courses\Resources\CourseCollection;
use App\Modules\Courses\Services\CourseService;

class CourseDeleteController extends Controller
{
    private $courseService;

    public function __construct(CourseService $courseService)
    {
        $this->courseService = $courseService;
    }

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