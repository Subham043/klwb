<?php

namespace App\Modules\CourseManagement\Classes\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\CourseManagement\Classes\Requests\ClassesRequest;
use App\Modules\CourseManagement\Classes\Resources\ClassesCollection;
use App\Modules\CourseManagement\Classes\Services\ClassesService;

class ClassesUpdateController extends Controller
{
    public function __construct(private ClassesService $classesService){}

    /**
     * Update the specified Classes in storage.
     *
     * @param  \App\Modules\CourseManagement\Classes\Requests\ClassesRequest  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function index(ClassesRequest $request, $id){
        $classes = $this->classesService->getById($id);
        try {
            //code...
            $this->classesService->update(
                $request->validated(),
                $classes
            );
            return response()->json(["message" => "Classes updated successfully.", "data" => ClassesCollection::make($classes)], 200);
        } catch (\Throwable $th) {
            return response()->json(["message" => "Something went wrong. Please try again"], 400);
        }

    }
}
