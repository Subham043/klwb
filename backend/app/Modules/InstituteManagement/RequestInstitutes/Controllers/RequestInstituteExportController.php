<?php

namespace App\Modules\InstituteManagement\RequestInstitutes\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\InstituteManagement\RequestInstitutes\Services\RequestInstituteService;

class RequestInstituteExportController extends Controller
{
    private $instituteService;

    public function __construct(RequestInstituteService $instituteService)
    {
        $this->instituteService = $instituteService;
    }

    public function index(){
        return $this->instituteService->excel()->toBrowser();
    }
}
