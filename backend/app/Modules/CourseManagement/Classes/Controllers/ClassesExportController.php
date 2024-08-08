<?php

namespace App\Modules\CourseManagement\Classes\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\CourseManagement\Classes\Exports\ClassesExport;
use App\Modules\CourseManagement\Classes\Services\ClassesService;
use Maatwebsite\Excel\Facades\Excel;

class ClassesExportController extends Controller
{
    private $classesService;

    public function __construct(ClassesService $classesService)
    {
        $this->classesService = $classesService;
    }

    public function index(){
        $classes = $this->classesService->all();
        return Excel::download(new ClassesExport($classes), 'classes.xlsx');
    }
}
