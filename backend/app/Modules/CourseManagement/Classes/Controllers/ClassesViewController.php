<?php

namespace App\Modules\CourseManagement\Classes\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\CourseManagement\Classes\Resources\ClassesCollection;
use App\Modules\CourseManagement\Classes\Services\ClassesService;

class ClassesViewController extends Controller
{
    public function __construct(private ClassesService $classesService){}

    public function index($id){
        $classes = $this->classesService->getById($id);
        return response()->json(["message" => "Classes fetched successfully.", "data" => ClassesCollection::make($classes)], 200);
    }
}
