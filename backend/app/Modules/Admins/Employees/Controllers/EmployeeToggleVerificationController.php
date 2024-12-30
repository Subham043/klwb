<?php

namespace App\Modules\Admins\Employees\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\ToggleStatusRequest;
use App\Modules\Admins\Employees\Resources\EmployeeCollection;
use App\Modules\Admins\Employees\Services\EmployeeService;
use Illuminate\Support\Facades\DB;

class EmployeeToggleVerificationController extends Controller
{
    public function __construct(private EmployeeService $employeeService){}

/**
 * Toggle the verification status of an employee.
 *
 * @param ToggleStatusRequest $request The request object containing validation data.
 * @param int $id The ID of the employee to verify.
 * @return \Illuminate\Http\JsonResponse A JSON response indicating success or failure.
 * 
 * If the employee is already verified, the response will indicate so.
 * If the verification is successful, the response will include the updated employee data.
 * In case of failure, the response will return an error message.
 */

    public function index(ToggleStatusRequest $request, $id){
        $employee = $this->employeeService->getById($id);
        if($employee->verified_at){
            return response()->json(["message" => "Employee already verified."], 400);
        }
        DB::beginTransaction();
        try {
            //code...
            $this->employeeService->update(['verified_at'=>now()], $employee);
            return response()->json(["message" => "Employee verified successfully.", "data" => EmployeeCollection::make($employee)], 200);
        } catch (\Throwable $th) {
            DB::rollBack();
            return response()->json(["message" => "Something went wrong. Please try again"], 400);
        } finally {
            DB::commit();
        }

    }
}
