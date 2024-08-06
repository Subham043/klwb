<?php

namespace App\Modules\CourseManagement\Graduations\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\CourseManagement\Graduations\Exports\GraduationExport;
use Maatwebsite\Excel\Facades\Excel;

class GraduationExportController extends Controller
{
    public function index(){
        return Excel::download(new GraduationExport, 'graduations.xlsx');
    }
}
