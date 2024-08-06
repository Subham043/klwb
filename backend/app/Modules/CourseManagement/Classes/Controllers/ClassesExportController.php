<?php

namespace App\Modules\CourseManagement\Classes\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\CourseManagement\Classes\Exports\ClassesExport;
use Maatwebsite\Excel\Facades\Excel;

class ClassesExportController extends Controller
{
    public function index(){
        return Excel::download(new ClassesExport, 'classes.xlsx');
    }
}
