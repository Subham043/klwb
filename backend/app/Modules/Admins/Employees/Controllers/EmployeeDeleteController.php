<?php

namespace App\Modules\Admins\Employees\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Admins\Employees\Resources\EmployeeCollection;
use App\Modules\Admins\Employees\Services\EmployeeService;

class EmployeeDeleteController extends Controller
{
    public function __construct(private EmployeeService $employeeService){}

    public function index($id){
        $employee = $this->employeeService->getById($id);

        try {
            //code...
            $this->employeeService->delete(
                $employee
            );
            $this->employeeService->syncRoles([], $employee);
            return response()->json(["message" => "Employee deleted successfully.", "data" => EmployeeCollection::make($employee)], 200);
        } catch (\Throwable $th) {
            return response()->json(["message" => "Something went wrong. Please try again"], 400);
        }
    }

}
