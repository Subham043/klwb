<?php

namespace App\Modules\Admins\Industries\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Admins\Industries\Services\IndustryService;

class IndustryExportController extends Controller
{
    public function __construct(private IndustryService $industryService){}

    /**
     * Download an Excel file containing all industries.
     *
     * @return \Symfony\Component\HttpFoundation\BinaryFileResponse
     */
    public function index(){
        return $this->industryService->excel()->toBrowser();
    }
}
