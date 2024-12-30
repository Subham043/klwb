<?php

namespace App\Modules\Admins\RegisteredIndustry\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Admins\RegisteredIndustry\Services\RegisteredIndustryService;

class RegisteredIndustryExportController extends Controller
{
    public function __construct(private RegisteredIndustryService $industryService){}

    /**
     * Download an Excel file containing all registered industries.
     *
     * @return \Symfony\Component\HttpFoundation\BinaryFileResponse
     */
    public function index(){
        return $this->industryService->excel()->toBrowser();
    }
}
