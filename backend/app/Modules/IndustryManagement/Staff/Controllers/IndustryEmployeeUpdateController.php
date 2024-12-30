<?php

namespace App\Modules\IndustryManagement\Staff\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\IndustryManagement\Staff\Requests\IndustryEmployeeUpdatePostRequest;
use App\Modules\IndustryManagement\Staff\Resources\IndustryEmployeeCollection;
use App\Modules\IndustryManagement\Staff\Services\IndustryEmployeeService;
use Illuminate\Support\Facades\DB;

class IndustryEmployeeUpdateController extends Controller
{
    public function __construct(private IndustryEmployeeService $employeeService){}

/**
 * Update an industry employee's information.
 *
 * @param IndustryEmployeeUpdatePostRequest $request The request containing the employee data to update.
 * @param int $id The ID of the industry employee to update.
 *
 * @return \Illuminate\Http\JsonResponse A JSON response indicating the success or failure of the update operation.
 */

    public function index(IndustryEmployeeUpdatePostRequest $request, $id){
        $employee = $this->employeeService->getById($id);
        DB::beginTransaction();
        try {
            //code...
            $this->employeeService->update(
                [...$request->validated()],
                $employee
            );
            return response()->json(["message" => "Employee updated successfully.", "data" => IndustryEmployeeCollection::make($employee)], 200);
        } catch (\Throwable $th) {
            DB::rollBack();
            return response()->json(["message" => "Something went wrong. Please try again"], 400);
        } finally {
            DB::commit();
        }

    }
}
