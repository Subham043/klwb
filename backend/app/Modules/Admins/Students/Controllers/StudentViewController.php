<?php

namespace App\Modules\Admins\Students\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Admins\Students\Resources\StudentCollection;
use App\Modules\Admins\Students\Services\StudentService;

class StudentViewController extends Controller
{
    public function __construct(private StudentService $studentService){}

    public function index($id){
        $student = $this->studentService->getById($id);
        return response()->json(["message" => "Student fetched successfully.", "data" => StudentCollection::make($student)], 200);
    }
}
