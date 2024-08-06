<?php

namespace App\Modules\Admins\Employees\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Admins\Employees\Exports\EmployeeExport;
use App\Modules\Admins\Employees\Services\EmployeeService;
use Maatwebsite\Excel\Facades\Excel;

class EmployeeExportController extends Controller
{
    private $employeeService;

    public function __construct(EmployeeService $employeeService)
    {
        $this->employeeService = $employeeService;
    }

    public function index(){
        $data = $this->employeeService->all();
        return Excel::download(new EmployeeExport($data), 'employees.xlsx');
    }
}
