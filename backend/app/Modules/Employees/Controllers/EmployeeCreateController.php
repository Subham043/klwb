<?php

namespace App\Modules\Employees\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Employees\Requests\EmployeeCreatePostRequest;
use App\Modules\Employees\Resources\EmployeeCollection;
use App\Modules\Employees\Services\EmployeeService;

class EmployeeCreateController extends Controller
{
    private $employeeService;

    public function __construct(EmployeeService $employeeService)
    {
        $this->employeeService = $employeeService;
    }

    public function index(EmployeeCreatePostRequest $request){

        try {
            //code...
            $employee = $this->employeeService->create(
                [...$request->except('role'), 'created_by' => auth()->user()->id]
            );
            $this->employeeService->syncRoles([$request->role], $employee);
            return response()->json(["message" => "Employee created successfully.", "data" => EmployeeCollection::make($employee)], 201);
        } catch (\Throwable $th) {
            throw $th;
            return response()->json(["message" => "Something went wrong. Please try again"], 400);
        }

    }
}