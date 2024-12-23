<?php

namespace App\Modules\IndustryManagement\Staff\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\IndustryManagement\Staff\Resources\IndustryEmployeeCollection;
use App\Modules\IndustryManagement\Staff\Services\IndustryEmployeeService;
use Illuminate\Support\Facades\DB;

class IndustryEmployeeToggleController extends Controller
{
    public function __construct(private IndustryEmployeeService $employeeService){}

    /**
     * Toggle the block status of an industry employee
     * @param int $id industry employee id
     * @return \Illuminate\Http\JsonResponse
     */
    public function index($id){
        $employee = $this->employeeService->getById($id);
        DB::beginTransaction();
        try {
            $this->employeeService->toggleStatus($employee);
            if($employee->is_blocked){
                return response()->json(["message" => "Employee Unblocked successfully.", "data" => IndustryEmployeeCollection::make($employee)], 200);
            }
            return response()->json(["message" => "Employee Blocked successfully.", "data" => IndustryEmployeeCollection::make($employee)], 200);
         } catch (\Throwable $th) {
            DB::rollBack();
            return response()->json(["message" => "Something went wrong. Please try again"], 400);
        } finally {
            DB::commit();
        }
    }
}
