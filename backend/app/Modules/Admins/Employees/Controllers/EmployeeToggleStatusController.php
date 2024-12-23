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

    /**
     * Toggle the blocked status of an employee.
     *
     * @param ToggleStatusRequest $request
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     *
     * This method retrieves the employee by the given ID, starts a database transaction,
     * and toggles the 'is_blocked' status of the employee. It returns a JSON response
     * indicating whether the employee was blocked or unblocked successfully. In case
     * of an error, it returns a 400 status JSON response with an error message.
     */

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
