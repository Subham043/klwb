<?php

namespace App\Modules\CourseManagement\Classes\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Enums\Guards;
use App\Modules\CourseManagement\Classes\Services\ClassesService;
use App\Modules\CourseManagement\Classes\Exports\ClassExport;
use App\Modules\Roles\Enums\Roles;
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
        return (auth()->guard(Guards::Admin->value())->user()->current_role == Roles::SuperAdmin->value() || auth()->guard(Guards::Admin->value())->user()->current_role == Roles::Admin->value()) ? Excel::download(new ClassExport($this->classesService->getExcelQuery()), 'classes.xlsx') : abort(403);
        // return Excel::download(new ClassExport($this->classesService->getExcelQuery()), 'classes.xlsx');
    }
}
