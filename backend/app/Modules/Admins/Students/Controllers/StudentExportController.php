<?php

namespace App\Modules\Admins\Students\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Enums\Guards;
use App\Modules\Admins\Employees\Exports\EmployeeExport;
use App\Modules\Admins\Students\Services\StudentService;
use App\Modules\Roles\Enums\Roles;
use Maatwebsite\Excel\Facades\Excel;

class StudentExportController extends Controller
{
    public function __construct(private StudentService $studentService){}

    /**
     * Exports all students to an excel file.
     *
     * @return \Spatie\SimpleExcel\Exports\Export
     */
    public function index(){
        ini_set('memory_limit', '-1');
        ini_set('max_execution_time', 300);
        return (auth()->guard(Guards::Admin->value())->user()->current_role == Roles::SuperAdmin->value() || auth()->guard(Guards::Admin->value())->user()->current_role == Roles::Admin->value()) ? Excel::download(new EmployeeExport($this->studentService->getExcelQuery()), 'students.xlsx') : abort(403);
        // return Excel::download(new EmployeeExport($this->studentService->getExcelQuery()), 'students.xlsx');
    }
}
