<?php

namespace App\Modules\Classes\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Classes\Requests\ClassesRequest;
use App\Modules\Classes\Resources\ClassesCollection;
use App\Modules\Classes\Services\ClassesService;

class ClassesCreateController extends Controller
{
    private $classesService;

    public function __construct(ClassesService $classesService)
    {
        $this->classesService = $classesService;
    }

    public function index(ClassesRequest $request){
        try {
            //code...
            $classes = $this->classesService->create(
                $request->validated()
            );
            return response()->json(["message" => "Classes created successfully.", "data" => ClassesCollection::make($classes)], 201);
        } catch (\Throwable $th) {
            return response()->json(["message" => "Something went wrong. Please try again"], 400);
        }

    }
}