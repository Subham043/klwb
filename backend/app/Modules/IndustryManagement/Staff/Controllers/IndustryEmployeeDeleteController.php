<?php

namespace App\Modules\IndustryManagement\Staff\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\IndustryManagement\Staff\Resources\IndustryEmployeeCollection;
use App\Modules\IndustryManagement\Staff\Services\IndustryEmployeeService;

class IndustryEmployeeDeleteController extends Controller
{
    private $employeeService;

    public function __construct(IndustryEmployeeService $employeeService)
    {
        $this->employeeService = $employeeService;
    }

    public function index($id){
        $employee = $this->employeeService->getById($id);

        try {
            //code...
            $this->employeeService->delete(
                $employee
            );
            $this->employeeService->syncRoles([], $employee);
            return response()->json(["message" => "Employee deleted successfully.", "data" => IndustryEmployeeCollection::make($employee)], 200);
        } catch (\Throwable $th) {
            return response()->json(["message" => "Something went wrong. Please try again"], 400);
        }
    }

}
