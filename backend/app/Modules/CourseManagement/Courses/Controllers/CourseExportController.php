<?php

namespace App\Modules\CourseManagement\Courses\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\CourseManagement\Courses\Exports\CourseExport;
use App\Modules\CourseManagement\Courses\Services\CourseService;
use Illuminate\Http\Request;
use Maatwebsite\Excel\Facades\Excel;

class CourseExportController extends Controller
{
    private $courseService;

    public function __construct(CourseService $courseService)
    {
        $this->courseService = $courseService;
    }

    public function index(Request $request){
        $course = $this->courseService->all($request->graduation_id ?? null);
        return Excel::download(new CourseExport($course), 'courses.xlsx');
    }
}
