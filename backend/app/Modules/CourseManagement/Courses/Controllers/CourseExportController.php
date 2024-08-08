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

    public function index(){
        $course = $this->courseService->all();
        return Excel::download(new CourseExport($course), 'courses.xlsx');
    }
}
