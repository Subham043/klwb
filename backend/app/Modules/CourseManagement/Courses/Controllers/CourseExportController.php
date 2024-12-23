<?php

namespace App\Modules\CourseManagement\Courses\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\CourseManagement\Courses\Services\CourseService;

class CourseExportController extends Controller
{
    public function __construct(private CourseService $courseService){}

    /**
     * Download an Excel file containing all the Courses.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(){
        return $this->courseService->excel()->toBrowser();
    }
}
