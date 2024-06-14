<?php

namespace App\Modules\Classes\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Classes\Resources\ClassesCollection;
use App\Modules\Classes\Services\ClassesService;

class ClassesDeleteController extends Controller
{
    private $classesService;

    public function __construct(ClassesService $classesService)
    {
        $this->classesService = $classesService;
    }

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