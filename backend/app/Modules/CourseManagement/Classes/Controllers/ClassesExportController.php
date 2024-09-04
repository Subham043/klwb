<?php

namespace App\Modules\CourseManagement\Classes\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\CourseManagement\Classes\Services\ClassesService;

class ClassesExportController extends Controller
{
    public function __construct(private ClassesService $classesService){}

    public function index(){
        return $this->classesService->excel()->toBrowser();
    }
}
