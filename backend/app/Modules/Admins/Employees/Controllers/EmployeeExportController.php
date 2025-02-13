<?php

namespace App\Modules\Admins\Employees\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Admins\Employees\Exports\EmployeeExport;
use App\Modules\Admins\Employees\Services\EmployeeService;
use Maatwebsite\Excel\Facades\Excel;

class EmployeeExportController extends Controller
{
    public function __construct(private EmployeeService $employeeService){}

    /**
     * Download all employees as excel file
     *
     * @return \Symfony\Component\HttpFoundation\BinaryFileResponse
     */
    public function index(){
        ini_set('memory_limit', '-1');
        ini_set('max_execution_time', 300);
        return Excel::download(new EmployeeExport($this->employeeService->getExcelQuery()), 'employees.xlsx');
    }
}
