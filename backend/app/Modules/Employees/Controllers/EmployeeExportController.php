<?php

namespace App\Modules\Employees\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Employees\Exports\EmployeeExport;
use Maatwebsite\Excel\Facades\Excel;

class EmployeeExportController extends Controller
{
    public function index(){
        return Excel::download(new EmployeeExport, 'employees.xlsx');
    }
}