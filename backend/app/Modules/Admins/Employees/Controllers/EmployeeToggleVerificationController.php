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
