<?php

namespace App\Modules\Admins\Employees\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Admins\Employees\Resources\EmployeeCollection;
use App\Modules\Admins\Employees\Services\EmployeeService;

class EmployeeViewController extends Controller
{
    public function __construct(private EmployeeService $employeeService){}

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function index($id){
        $employee = $this->employeeService->getById($id);
        return response()->json(["message" => "Employee fetched successfully.", "data" => EmployeeCollection::make($employee)], 200);
    }
}
