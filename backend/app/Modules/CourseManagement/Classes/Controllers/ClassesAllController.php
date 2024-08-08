<?php

namespace App\Modules\CourseManagement\Classes\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\CourseManagement\Classes\Resources\ClassesCollection;
use App\Modules\CourseManagement\Classes\Services\ClassesService;

class ClassesAllController extends Controller
{
    private $classesService;

    public function __construct(ClassesService $classesService)
    {
        $this->classesService = $classesService;
    }

    public function index(){
        $classes = $this->classesService->all();
        return response()->json(["message" => "Classes fetched successfully.", "data" => ClassesCollection::collection($classes)], 200);
    }
}
