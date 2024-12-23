<?php

namespace App\Modules\Admins\NonRegisteredInstitute\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Admins\NonRegisteredInstitute\Services\NonRegisteredInstituteService;

class NonRegisteredInstituteExportController extends Controller
{
    public function __construct(private NonRegisteredInstituteService $instituteService){}

    /**
     * Download excel file containing all non-registered institutes.
     *
     * @return \Symfony\Component\HttpFoundation\BinaryFileResponse
     */
    public function index(){
        return $this->instituteService->excel()->toBrowser();
    }
}
