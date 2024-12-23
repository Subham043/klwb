<?php

namespace App\Modules\CourseManagement\Classes\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\CourseManagement\Classes\Resources\ClassesCollection;
use App\Modules\CourseManagement\Classes\Services\ClassesService;
use Illuminate\Http\Request;

class ClassesPaginateController extends Controller
{
    public function __construct(private ClassesService $classesService){}

    /**
     * Return a paginated list of Classes.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request){
        $data = $this->classesService->paginate($request->total ?? 10);
        return ClassesCollection::collection($data);
    }

}
