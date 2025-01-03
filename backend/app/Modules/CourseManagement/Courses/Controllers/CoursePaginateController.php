<?php

namespace App\Modules\CourseManagement\Courses\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\CourseManagement\Courses\Resources\CourseCollection;
use App\Modules\CourseManagement\Courses\Services\CourseService;
use Illuminate\Http\Request;

class CoursePaginateController extends Controller
{
    public function __construct(private CourseService $courseService){}

/**
 * Return a paginated list of Courses.
 *
 * @param  \Illuminate\Http\Request  $request
 * @return \Illuminate\Http\Response
 */

    public function index(Request $request){
        $data = $this->courseService->paginate($request->total ?? 10);
        return CourseCollection::collection($data);
    }

}
