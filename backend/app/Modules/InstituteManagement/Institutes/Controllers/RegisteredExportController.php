<?php

namespace App\Modules\InstituteManagement\Institutes\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\InstituteManagement\Institutes\Services\InstituteRegisteredService;

class RegisteredExportController extends Controller
{
    public function __construct(private InstituteRegisteredService $instituteService){}

    public function index(){
        return $this->instituteService->excel()->toBrowser();
    }
}
