<?php

namespace App\Modules\CourseManagement\Classes\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\ToggleStatusRequest;
use App\Modules\CourseManagement\Classes\Resources\ClassesCollection;
use App\Modules\CourseManagement\Classes\Services\ClassesService;

class ClassesToggleController extends Controller
{
    public function __construct(private ClassesService $classesService){}

    /**
     * Toggle the status of a classes.
     * 
     * @param ToggleStatusRequest $request
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function index(ToggleStatusRequest $request, $id){
        $classes = $this->classesService->getById($id);
        try {
            //code...
            $this->classesService->toggleStatus($classes);
            if($classes->is_active){
                return response()->json(["message" => "Classes unblocked successfully.", "data" => ClassesCollection::make($classes)], 200);
            }
            return response()->json(["message" => "Classes blocked successfully.", "data" => ClassesCollection::make($classes)], 200);
        } catch (\Throwable $th) {
            return response()->json(["message" => "Something went wrong. Please try again"], 400);
        }

    }
}
