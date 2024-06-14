<?php

namespace App\Modules\Courses\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Courses\Resources\CourseCollection;
use App\Modules\Courses\Services\CourseService;
use Illuminate\Http\Request;

class CoursePaginateController extends Controller
{
    private $courseService;

    public function __construct(CourseService $courseService)
    {
        $this->courseService = $courseService;
    }

    public function index(Request $request){
        $data = $this->courseService->paginate($request->total ?? 10);
        return CourseCollection::collection($data);
    }

}
