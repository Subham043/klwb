<?php

namespace App\Modules\Admins\Students\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\ToggleStatusRequest;
use App\Modules\Admins\Students\Resources\StudentCollection;
use App\Modules\Admins\Students\Services\StudentService;
use Illuminate\Support\Facades\DB;

class StudentToggleVerificationController extends Controller
{
    public function __construct(private StudentService $studentService){}

    public function index(ToggleStatusRequest $request, $id){
        $student = $this->studentService->getById($id);
        if($student->verified_at){
            return response()->json(["message" => "Student already verified."], 400);
        }
        DB::beginTransaction();
        try {
            //code...
            $this->studentService->update(['verified_at'=>now()], $student);
            return response()->json(["message" => "Student verified successfully.", "data" => StudentCollection::make($student)], 200);
        } catch (\Throwable $th) {
            DB::rollBack();
            return response()->json(["message" => "Something went wrong. Please try again"], 400);
        } finally {
            DB::commit();
        }

    }
}
