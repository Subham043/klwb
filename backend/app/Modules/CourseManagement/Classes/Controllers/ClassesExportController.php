<?php

namespace App\Modules\CourseManagement\Classes\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\CourseManagement\Classes\Exports\ClassesExport;
use App\Modules\CourseManagement\Classes\Services\ClassesService;
use Illuminate\Http\Request;
use Maatwebsite\Excel\Facades\Excel;

class ClassesExportController extends Controller
{
    private $classesService;

    public function __construct(ClassesService $classesService)
    {
        $this->classesService = $classesService;
    }

    public function index(Request $request){
        $classes = $this->classesService->all($request->course_id ?? null);
        return Excel::download(new ClassesExport($classes), 'classes.xlsx');
    }
}
