<?php

namespace App\Modules\InstituteManagement\Staff\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\InstituteManagement\Staff\Resources\InstituteEmployeeCollection;
use App\Modules\InstituteManagement\Staff\Services\InstituteEmployeeService;
use Illuminate\Http\Request;

class InstituteEmployeePaginateController extends Controller
{
    private $employeeService;

    public function __construct(InstituteEmployeeService $employeeService)
    {
        $this->employeeService = $employeeService;
    }

    public function index(Request $request){
        $data = $this->employeeService->paginate($request->total ?? 10);
        return InstituteEmployeeCollection::collection($data);
    }

}
