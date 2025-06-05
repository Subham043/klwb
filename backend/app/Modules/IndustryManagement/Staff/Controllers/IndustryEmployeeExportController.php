<?php

namespace App\Modules\IndustryManagement\Staff\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Enums\Guards;
use App\Modules\Admins\Employees\Exports\EmployeeExport;
use App\Modules\IndustryManagement\Staff\Services\IndustryEmployeeService;
use App\Modules\Roles\Enums\Roles;
use Maatwebsite\Excel\Facades\Excel;

class IndustryEmployeeExportController extends Controller
{
    public function __construct(private IndustryEmployeeService $employeeService){}

    /**
     * Export all industry employees as an Excel file and send it to the browser.
     *
     * @return \Symfony\Component\HttpFoundation\BinaryFileResponse
     */

    public function index(){
        ini_set('memory_limit', '-1');
        ini_set('max_execution_time', 300);
        return (auth()->guard(Guards::Industry->value())->user()->current_role == Roles::Industry->value()) ? Excel::download(new EmployeeExport($this->employeeService->getExcelQuery()), 'staffs.xlsx') : abort(403);
        // return Excel::download(new EmployeeExport($this->employeeService->getExcelQuery()), 'staffs.xlsx');
    }
}
