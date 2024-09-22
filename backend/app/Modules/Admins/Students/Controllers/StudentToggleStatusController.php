<?php

namespace App\Modules\Admins\Students\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\ToggleStatusRequest;
use App\Modules\Admins\Students\Resources\StudentCollection;
use App\Modules\Admins\Students\Services\StudentService;
use Illuminate\Support\Facades\DB;

class StudentToggleStatusController extends Controller
{
    public function __construct(private StudentService $studentService){}

    public function index(ToggleStatusRequest $request, $id){
        $student = $this->studentService->getById($id);
        DB::beginTransaction();
        try {
            //code...
            $this->studentService->toggleStatus($student);
            if($student->is_blocked){
                return response()->json(["message" => "Student blocked successfully.", "data" => StudentCollection::make($student)], 200);
            }
            return response()->json(["message" => "Student unblocked successfully.", "data" => StudentCollection::make($student)], 200);
        } catch (\Throwable $th) {
            DB::rollBack();
            return response()->json(["message" => "Something went wrong. Please try again"], 400);
        } finally {
            DB::commit();
        }

    }
}
