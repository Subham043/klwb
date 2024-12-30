<?php

namespace App\Modules\CourseManagement\Courses\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\CourseManagement\Courses\Resources\CourseCollection;
use App\Modules\CourseManagement\Courses\Services\CourseService;

class CourseViewController extends Controller
{
    public function __construct(private CourseService $courseService){}

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function index($id){
        $course = $this->courseService->getById($id);
        return response()->json(["message" => "Course fetched successfully.", "data" => CourseCollection::make($course)], 200);
    }
}
