<?php

namespace App\Modules\CourseManagement\Classes\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\CourseManagement\Classes\Requests\ClassesRequest;
use App\Modules\CourseManagement\Classes\Resources\ClassesCollection;
use App\Modules\CourseManagement\Classes\Services\ClassesService;

class ClassesCreateController extends Controller
{
    public function __construct(private ClassesService $classesService){}

    /**
     * Store a newly created Classes in storage.
     *
     * @param  \App\Modules\CourseManagement\Classes\Requests\ClassesRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function index(ClassesRequest $request){
        try {
            //code...
            $classes = $this->classesService->create(
                [...$request->validated(), 'is_active' => 1]
            );
            return response()->json(["message" => "Classes created successfully.", "data" => ClassesCollection::make($classes)], 201);
        } catch (\Throwable $th) {
            return response()->json(["message" => "Something went wrong. Please try again"], 400);
        }

    }
}
