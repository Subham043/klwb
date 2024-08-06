<?php

namespace App\Modules\CourseManagement\Classes\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\CourseManagement\Classes\Resources\ClassesCollection;
use App\Modules\CourseManagement\Classes\Services\ClassesService;
use Illuminate\Http\Request;

class ClassesPaginateController extends Controller
{
    private $classesService;

    public function __construct(ClassesService $classesService)
    {
        $this->classesService = $classesService;
    }

    public function index(Request $request){
        $data = $this->classesService->paginate($request->total ?? 10);
        return ClassesCollection::collection($data);
    }

}
