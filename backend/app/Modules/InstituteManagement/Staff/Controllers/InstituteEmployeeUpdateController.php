<?php

namespace App\Modules\InstituteManagement\Staff\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\InstituteManagement\Staff\Requests\InstituteEmployeeUpdatePostRequest;
use App\Modules\InstituteManagement\Staff\Resources\InstituteEmployeeCollection;
use App\Modules\InstituteManagement\Staff\Services\InstituteEmployeeService;
use Illuminate\Support\Facades\DB;

class InstituteEmployeeUpdateController extends Controller
{
    public function __construct(private InstituteEmployeeService $employeeService){}

/**
 * Update an institute employee's information.
 *
 * @param InstituteEmployeeUpdatePostRequest $request The request containing the employee update data.
 * @param int $id The ID of the employee to update.
 *
 * @return \Illuminate\Http\JsonResponse A JSON response indicating the success or failure of the operation.
 */

    public function index(InstituteEmployeeUpdatePostRequest $request, $id){
        $employee = $this->employeeService->getById($id);
        DB::beginTransaction();
        try {
            //code...
            $this->employeeService->update(
                [...$request->validated()],
                $employee
            );
            return response()->json(["message" => "Employee updated successfully.", "data" => InstituteEmployeeCollection::make($employee)], 200);
        } catch (\Throwable $th) {
            DB::rollBack();
            return response()->json(["message" => "Something went wrong. Please try again"], 400);
        } finally {
            DB::commit();
        }

    }
}
