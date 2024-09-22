<?php

namespace App\Modules\Admins\Employees\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\ToggleStatusRequest;
use App\Modules\Admins\Employees\Resources\EmployeeCollection;
use App\Modules\Admins\Employees\Services\EmployeeService;
use Illuminate\Support\Facades\DB;

class EmployeeToggleStatusController extends Controller
{
    public function __construct(private EmployeeService $employeeService){}

    public function index(ToggleStatusRequest $request, $id){
        $employee = $this->employeeService->getById($id);
        DB::beginTransaction();
        try {
            //code...
            $this->employeeService->toggleStatus($employee);
            if($employee->is_blocked){
                return response()->json(["message" => "Employee blocked successfully.", "data" => EmployeeCollection::make($employee)], 200);
            }
            return response()->json(["message" => "Employee unblocked successfully.", "data" => EmployeeCollection::make($employee)], 200);
        } catch (\Throwable $th) {
            DB::rollBack();
            return response()->json(["message" => "Something went wrong. Please try again"], 400);
        } finally {
            DB::commit();
        }

    }
}
