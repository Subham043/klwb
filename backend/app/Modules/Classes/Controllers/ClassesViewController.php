<?php

namespace App\Modules\Classes\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Classes\Resources\ClassesCollection;
use App\Modules\Classes\Services\ClassesService;

class ClassesViewController extends Controller
{
    private $classesService;

    public function __construct(ClassesService $classesService)
    {
        $this->classesService = $classesService;
    }

    public function index($id){
        $classes = $this->classesService->getById($id);
        return response()->json(["message" => "Classes fetched successfully.", "data" => ClassesCollection::make($classes)], 200);
    }
}