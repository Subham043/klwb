<?php

namespace App\Modules\CourseManagement\Classes\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\CourseManagement\Classes\Services\ClassesService;
use App\Modules\CourseManagement\Classes\Exports\ClassExport;
use Maatwebsite\Excel\Facades\Excel;

class ClassesExportController extends Controller
{
    public function __construct(private ClassesService $classesService){}

    /**
     * Download an Excel file containing all the Classes.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(){
        ini_set('memory_limit', '-1');
        ini_set('max_execution_time', 300);
        return Excel::download(new ClassExport($this->classesService->getExcelQuery()), 'classes.xlsx');
    }
}
