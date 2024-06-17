<?php

namespace App\Modules\Courses\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Courses\Exports\CourseExport;
use Maatwebsite\Excel\Facades\Excel;

class CourseExportController extends Controller
{
    public function index(){
        return Excel::download(new CourseExport, 'courses.xlsx');
    }
}