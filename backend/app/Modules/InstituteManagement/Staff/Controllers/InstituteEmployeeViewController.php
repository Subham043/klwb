<?php

namespace App\Modules\InstituteManagement\Staff\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\InstituteManagement\Staff\Resources\InstituteEmployeeCollection;
use App\Modules\InstituteManagement\Staff\Services\InstituteEmployeeService;

class InstituteEmployeeViewController extends Controller
{
    private $employeeService;

    public function __construct(InstituteEmployeeService $employeeService)
    {
        $this->employeeService = $employeeService;
    }

    public function index($id){
        $employee = $this->employeeService->getById($id);
        return response()->json(["message" => "Employee fetched successfully.", "data" => InstituteEmployeeCollection::make($employee)], 200);
    }
}
