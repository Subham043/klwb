<?php

namespace App\Modules\Admins\Students\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Enums\Guards;
use App\Modules\Admins\Students\Events\StudentCreated;
use App\Modules\Admins\Students\Requests\StudentCreatePostRequest;
use App\Modules\Admins\Students\Resources\StudentCollection;
use App\Modules\Admins\Students\Services\StudentService;
use Illuminate\Support\Facades\DB;

class StudentCreateController extends Controller
{

    public function __construct(private StudentService $studentService){}

    /**
     * Handle the incoming request to create a new student.
     *
     * This method initiates a database transaction to create a new student
     * record using the validated data from the request. It also assigns the
     * "Student" role to the newly created student and dispatches a
     * StudentCreated event. If the operation is successful, it returns a JSON
     * response with a success message and the created student data. If an
     * error occurs, it rolls back the transaction and returns an error message.
     *
     * @param StudentCreatePostRequest $request The request object containing
     * the validated data for creating a student.
     * @return \Illuminate\Http\JsonResponse A JSON response indicating the
     * success or failure of the operation.
     */

    public function index(StudentCreatePostRequest $request){
        DB::beginTransaction();
        try {
            //code...
            $student = $this->studentService->create(
                [
                    ...$request->validated(), 
                    'is_blocked' => 0
                ]
            );
            $this->studentService->syncRoles(["Student"], $student);
            StudentCreated::dispatch($student, $request->password);
            return response()->json([
                "message" => "Student created successfully.",
                "data" => StudentCollection::make($student),
            ], 201);
        } catch (\Throwable $th) {
            DB::rollBack();
            return response()->json(["message" => "Something went wrong. Please try again"], 400);
        } finally {
            DB::commit();
        }

    }
}
