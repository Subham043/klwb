<?php

namespace App\Modules\InstituteManagement\Staff\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Admins\Employees\Exports\EmployeeExport;
use App\Modules\InstituteManagement\Staff\Services\InstituteEmployeeService;
use Maatwebsite\Excel\Facades\Excel;

class InstituteEmployeeExportController extends Controller
{
    public function __construct(private InstituteEmployeeService $employeeService){}

    /**
     * Download all employees as excel file
     *
     * @return \Symfony\Component\HttpFoundation\BinaryFileResponse
     */
    public function index(){
        ini_set('memory_limit', '-1');
        ini_set('max_execution_time', 300);
        return Excel::download(new EmployeeExport($this->employeeService->getExcelQuery()), 'staffs.xlsx');
    }
}
