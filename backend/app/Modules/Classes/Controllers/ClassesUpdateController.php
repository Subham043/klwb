<?php

namespace App\Modules\Classes\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Classes\Requests\ClassesRequest;
use App\Modules\Classes\Resources\ClassesCollection;
use App\Modules\Classes\Services\ClassesService;

class ClassesUpdateController extends Controller
{
    private $classesService;

    public function __construct(ClassesService $classesService)
    {
        $this->classesService = $classesService;
    }

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