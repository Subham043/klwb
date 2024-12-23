<?php

namespace App\Modules\Admins\RegisteredInstitute\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Admins\RegisteredInstitute\Services\RegisteredInstituteService;

class RegisteredInstituteExportController extends Controller
{
    public function __construct(private RegisteredInstituteService $instituteService){}

    /**
     * Download an Excel file containing all registered institutes.
     *
     * @return \Symfony\Component\HttpFoundation\BinaryFileResponse
     */
    public function index(){
        return $this->instituteService->excel()->toBrowser();
    }
}
