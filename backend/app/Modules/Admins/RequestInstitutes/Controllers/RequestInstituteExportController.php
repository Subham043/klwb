<?php

namespace App\Modules\Admins\RequestInstitutes\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Admins\RequestInstitutes\Services\RequestInstituteService;

class RequestInstituteExportController extends Controller
{
    public function __construct(private RequestInstituteService $instituteService){}

    /**
     * Export and download an Excel file containing all requested institutes.
     *
     * @return \Symfony\Component\HttpFoundation\BinaryFileResponse
     */

    public function index(){
        return $this->instituteService->excel()->toBrowser();
    }
}
