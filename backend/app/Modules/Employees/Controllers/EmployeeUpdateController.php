<?php

namespace App\Modules\Employees\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Employees\Requests\EmployeeUpdatePostRequest;
use App\Modules\Employees\Resources\EmployeeCollection;
use App\Modules\Employees\Services\EmployeeService;

class EmployeeUpdateController extends Controller
{
    private $employeeService;

    public function __construct(EmployeeService $employeeService)
    {
        $this->employeeService = $employeeService;
    }

    public function index(EmployeeUpdatePostRequest $request, $id){
        $employee = $this->employeeService->getById($id);

        try {
            //code...
            $this->employeeService->update(
                [...$request->except(['role'])],
                $employee
            );
            $this->employeeService->syncRoles([$request->role], $employee);
            return response()->json(["message" => "Employee updated successfully.", "data" => EmployeeCollection::make($employee)], 200);
        } catch (\Throwable $th) {
            return response()->json(["message" => "Something went wrong. Please try again"], 400);
        }

    }
}