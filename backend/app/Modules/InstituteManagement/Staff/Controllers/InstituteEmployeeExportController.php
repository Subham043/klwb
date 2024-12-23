<?php

namespace App\Modules\InstituteManagement\Staff\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\InstituteManagement\Staff\Services\InstituteEmployeeService;

class InstituteEmployeeExportController extends Controller
{
    public function __construct(private InstituteEmployeeService $employeeService){}

    /**
     * Download all employees as excel file
     *
     * @return \Symfony\Component\HttpFoundation\BinaryFileResponse
     */
    public function index(){
        return $this->employeeService->excel()->toBrowser();
    }
}
