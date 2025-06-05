<?php

namespace App\Modules\CourseManagement\Courses\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Enums\Guards;
use App\Modules\CourseManagement\Courses\Services\CourseService;
use App\Modules\CourseManagement\Courses\Exports\CourseExport;
use App\Modules\Roles\Enums\Roles;
use Maatwebsite\Excel\Facades\Excel;

class CourseExportController extends Controller
{
    public function __construct(private CourseService $courseService){}

    /**
     * Download an Excel file containing all the Courses.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(){
        ini_set('memory_limit', '-1');
        ini_set('max_execution_time', 300);
        return (auth()->guard(Guards::Admin->value())->user()->current_role == Roles::SuperAdmin->value() || auth()->guard(Guards::Admin->value())->user()->current_role == Roles::Admin->value()) ? Excel::download(new CourseExport($this->courseService->getExcelQuery()), 'courses.xlsx') : abort(403);
        // return Excel::download(new CourseExport($this->courseService->getExcelQuery()), 'courses.xlsx');
    }
}
