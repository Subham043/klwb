<?php

namespace App\Modules\IndustryManagement\Staff\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\IndustryManagement\Staff\Services\IndustryEmployeeService;

class IndustryEmployeeExportController extends Controller
{
    private $employeeService;

    public function __construct(IndustryEmployeeService $employeeService)
    {
        $this->employeeService = $employeeService;
    }

    public function index(){
        return $this->employeeService->excel()->toBrowser();
    }
}
