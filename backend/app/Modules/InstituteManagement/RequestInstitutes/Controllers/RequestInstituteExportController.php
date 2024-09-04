<?php

namespace App\Modules\InstituteManagement\RequestInstitutes\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\InstituteManagement\RequestInstitutes\Services\RequestInstituteService;

class RequestInstituteExportController extends Controller
{
    public function __construct(private RequestInstituteService $instituteService){}

    public function index(){
        return $this->instituteService->excel()->toBrowser();
    }
}
