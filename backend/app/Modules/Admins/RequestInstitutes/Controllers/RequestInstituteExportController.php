<?php

namespace App\Modules\Admins\RequestInstitutes\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Admins\RequestInstitutes\Services\RequestInstituteService;

class RequestInstituteExportController extends Controller
{
    public function __construct(private RequestInstituteService $instituteService){}

    public function index(){
        return $this->instituteService->excel()->toBrowser();
    }
}
