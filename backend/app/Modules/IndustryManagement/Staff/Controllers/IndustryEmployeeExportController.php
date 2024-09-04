<?php

namespace App\Modules\IndustryManagement\Staff\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\IndustryManagement\Staff\Services\IndustryEmployeeService;

class IndustryEmployeeExportController extends Controller
{
    public function __construct(private IndustryEmployeeService $employeeService){}

    public function index(){
        return $this->employeeService->excel()->toBrowser();
    }
}
