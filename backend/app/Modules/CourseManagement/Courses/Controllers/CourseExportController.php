<?php

namespace App\Modules\CourseManagement\Courses\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\CourseManagement\Courses\Exports\CourseExport;
use Maatwebsite\Excel\Facades\Excel;

class CourseExportController extends Controller
{
    public function index(){
        return Excel::download(new CourseExport, 'courses.xlsx');
    }
}
