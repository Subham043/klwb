<?php

namespace App\Modules\Admins\Students\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Admins\Students\Resources\StudentCollection;
use App\Modules\Admins\Students\Services\StudentService;

class StudentDeleteController extends Controller
{
    public function __construct(private StudentService $studentService){}

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function index($id){
        $student = $this->studentService->getById($id);

        try {
            //code...
            $this->studentService->delete(
                $student
            );
            $this->studentService->syncRoles([], $student);
            return response()->json(["message" => "Student deleted successfully.", "data" => StudentCollection::make($student)], 200);
        } catch (\Throwable $th) {
            return response()->json(["message" => "Something went wrong. Please try again"], 400);
        }
    }

}
