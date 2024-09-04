<?php

namespace App\Modules\IndustryManagement\Staff\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\IndustryManagement\Staff\Resources\IndustryEmployeeCollection;
use App\Modules\IndustryManagement\Staff\Services\IndustryEmployeeService;

class IndustryEmployeeViewController extends Controller
{
    public function __construct(private IndustryEmployeeService $employeeService){}

    public function index($id){
        $employee = $this->employeeService->getById($id);
        return response()->json(["message" => "Employee fetched successfully.", "data" => IndustryEmployeeCollection::make($employee)], 200);
    }
}
