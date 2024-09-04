<?php

namespace App\Modules\CourseManagement\Classes\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\CourseManagement\Classes\Resources\ClassesCollection;
use App\Modules\CourseManagement\Classes\Services\ClassesService;

class ClassesDeleteController extends Controller
{
    public function __construct(private ClassesService $classesService){}

    public function index($id){
        $classes = $this->classesService->getById($id);

        try {
            //code...
            $this->classesService->delete(
                $classes
            );
            return response()->json(["message" => "Classes deleted successfully.", "data" => ClassesCollection::make($classes)], 200);
        } catch (\Throwable $th) {
            return response()->json(["message" => "Something went wrong. Please try again"], 400);
        }
    }

}
