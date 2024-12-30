<?php

namespace App\Modules\CourseManagement\Classes\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\CourseManagement\Classes\Services\ClassesService;

class ClassesExportController extends Controller
{
    public function __construct(private ClassesService $classesService){}

    /**
     * Download an Excel file containing all the Classes.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(){
        return $this->classesService->excel()->toBrowser();
    }
}
