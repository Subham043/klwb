<?php

namespace App\Modules\InstituteManagement\Staff\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\InstituteManagement\Staff\Resources\InstituteEmployeeCollection;
use App\Modules\InstituteManagement\Staff\Services\InstituteEmployeeService;

class InstituteEmployeeDeleteController extends Controller
{
    public function __construct(private InstituteEmployeeService $employeeService){}

    /**
     * Delete an institute employee
     *
     * @param int $id
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index($id){
        $employee = $this->employeeService->getById($id);

        try {
            //code...
            $this->employeeService->delete(
                $employee
            );
            $this->employeeService->syncRoles([], $employee);
            return response()->json(["message" => "Employee deleted successfully.", "data" => InstituteEmployeeCollection::make($employee)], 200);
        } catch (\Throwable $th) {
            return response()->json(["message" => "Something went wrong. Please try again"], 400);
        }
    }

}
