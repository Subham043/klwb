<?php

namespace App\Modules\InstituteManagement\Staff\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\InstituteManagement\Staff\Services\InstituteEmployeeService;

class InstituteEmployeeExportController extends Controller
{
    private $employeeService;

    public function __construct(InstituteEmployeeService $employeeService)
    {
        $this->employeeService = $employeeService;
    }

    public function index(){
        return $this->employeeService->excel()->toBrowser();
    }
}
