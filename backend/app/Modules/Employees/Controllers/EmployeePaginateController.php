<?php

namespace App\Modules\Employees\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Employees\Resources\EmployeeCollection;
use App\Modules\Employees\Services\EmployeeService;
use Illuminate\Http\Request;

class EmployeePaginateController extends Controller
{
    private $employeeService;

    public function __construct(EmployeeService $employeeService)
    {
        $this->employeeService = $employeeService;
    }

    public function index(Request $request){
        $data = $this->employeeService->paginate($request->total ?? 10);
        return EmployeeCollection::collection($data);
    }

}