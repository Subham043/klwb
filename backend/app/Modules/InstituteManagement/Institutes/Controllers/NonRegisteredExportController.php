<?php

namespace App\Modules\InstituteManagement\Institutes\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\InstituteManagement\Institutes\Services\InstituteNonRegisteredService;

class NonRegisteredExportController extends Controller
{
    private $instituteService;

    public function __construct(InstituteNonRegisteredService $instituteService)
    {
        $this->instituteService = $instituteService;
    }

    public function index(){
        return $this->instituteService->excel()->toBrowser();
    }
}
