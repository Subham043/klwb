<?php

namespace App\Modules\Admins\Employees\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Admins\Employees\Services\EmployeeService;

class EmployeeExportController extends Controller
{
    public function __construct(private EmployeeService $employeeService){}

    public function index(){
        return $this->employeeService->excel()->toBrowser();
    }
}
