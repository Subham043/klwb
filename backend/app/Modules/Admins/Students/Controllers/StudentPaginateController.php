<?php

namespace App\Modules\Admins\Students\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Admins\Students\Resources\StudentCollection;
use App\Modules\Admins\Students\Services\StudentService;
use Illuminate\Http\Request;

class StudentPaginateController extends Controller
{
    public function __construct(private StudentService $studentService){}

    /**
     * Display a paginated list of students.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */

    public function index(Request $request){
        $data = $this->studentService->paginate($request->total ?? 10);
        return StudentCollection::collection($data);
    }

}
