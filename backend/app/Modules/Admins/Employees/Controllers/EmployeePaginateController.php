<?php

namespace App\Modules\Admins\Employees\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Admins\Employees\Resources\EmployeeCollection;
use App\Modules\Admins\Employees\Services\EmployeeService;
use Illuminate\Http\Request;

class EmployeePaginateController extends Controller
{
    public function __construct(private EmployeeService $employeeService){}

    /**
     * Returns a paginated collection of employees.
     *
     * @param Request $request
     * @return EmployeeCollection
     */
    public function index(Request $request){
        $data = $this->employeeService->paginate($request->total ?? 10);
        return EmployeeCollection::collection($data);
    }

}
