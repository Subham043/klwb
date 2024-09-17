<?php

namespace App\Modules\InstituteManagement\Staff\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\InstituteManagement\Staff\Resources\InstituteEmployeeCollection;
use App\Modules\InstituteManagement\Staff\Services\InstituteEmployeeService;
use Illuminate\Support\Facades\DB;

class InstituteEmployeeToggleController extends Controller
{
    public function __construct(private InstituteEmployeeService $employeeService){}

    public function index($id){
        $employee = $this->employeeService->getById($id);
        DB::beginTransaction();
        try {
            $this->employeeService->toggleStatus($employee);
            if($employee->is_blocked){
                return response()->json(["message" => "Employee Unblocked successfully.", "data" => InstituteEmployeeCollection::make($employee)], 200);
            }
            return response()->json(["message" => "Employee Blocked successfully.", "data" => InstituteEmployeeCollection::make($employee)], 200);
         } catch (\Throwable $th) {
            DB::rollBack();
            return response()->json(["message" => "Something went wrong. Please try again"], 400);
        } finally {
            DB::commit();
        }
    }
}
