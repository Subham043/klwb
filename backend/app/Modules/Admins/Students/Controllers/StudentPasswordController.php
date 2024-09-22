<?php

namespace App\Modules\Admins\Students\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Admins\Students\Requests\StudentPasswordPostRequest;
use App\Modules\Admins\Students\Services\StudentService;
use Illuminate\Support\Facades\DB;

class StudentPasswordController extends Controller
{
    public function __construct(private StudentService $studentService){}

    public function index(StudentPasswordPostRequest $request, $id){
        $student = $this->studentService->getById($id);
        DB::beginTransaction();
        try {
            //code...
            $this->studentService->update(
                [...$request->validated()],
                $student
            );
            return response()->json(["message" => "Student password updated successfully."], 200);
        } catch (\Throwable $th) {
            DB::rollBack();
            return response()->json(["message" => "Something went wrong. Please try again"], 400);
        } finally {
            DB::commit();
        }

    }
}
