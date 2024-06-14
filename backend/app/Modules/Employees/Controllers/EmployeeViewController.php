<?php

namespace App\Modules\Employees\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Employees\Resources\EmployeeCollection;
use App\Modules\Employees\Services\EmployeeService;

class EmployeeViewController extends Controller
{
    private $employeeService;

    public function __construct(EmployeeService $employeeService)
    {
        $this->employeeService = $employeeService;
    }

    public function index($id){
        $employee = $this->employeeService->getById($id);
        return response()->json(["message" => "Employee fetched successfully.", "data" => EmployeeCollection::make($employee)], 200);
    }
}