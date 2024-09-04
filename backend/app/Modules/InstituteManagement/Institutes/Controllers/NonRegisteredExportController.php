<?php

namespace App\Modules\InstituteManagement\Institutes\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\InstituteManagement\Institutes\Services\InstituteNonRegisteredService;

class NonRegisteredExportController extends Controller
{
    public function __construct(private InstituteNonRegisteredService $instituteService){}

    public function index(){
        return $this->instituteService->excel()->toBrowser();
    }
}
