<?php

namespace App\Modules\Admins\Students\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Admins\Students\Requests\StudentUpdatePostRequest;
use App\Modules\Admins\Students\Resources\StudentCollection;
use App\Modules\Admins\Students\Services\StudentService;
use Illuminate\Support\Facades\DB;

class StudentUpdateController extends Controller
{
    public function __construct(private StudentService $studentService){}

    /**
     * Update the specified resource in storage.
     *
     * @param  StudentUpdatePostRequest  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function index(StudentUpdatePostRequest $request, $id){
        $student = $this->studentService->getById($id);
        DB::beginTransaction();
        try {
            //code...
            $this->studentService->update(
                [...$request->validated()],
                $student
            );
            $this->studentService->syncRoles([$request->role], $student);
            return response()->json(["message" => "Student updated successfully.", "data" => StudentCollection::make($student)], 200);
        } catch (\Throwable $th) {
            DB::rollBack();
            return response()->json(["message" => "Something went wrong. Please try again"], 400);
        } finally {
            DB::commit();
        }

    }
}
