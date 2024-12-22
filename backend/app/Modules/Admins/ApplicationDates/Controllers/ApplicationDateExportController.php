<?php

namespace App\Modules\Admins\ApplicationDates\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Admins\ApplicationDates\Services\ApplicationDateService;

class ApplicationDateExportController extends Controller
{
    public function __construct(private ApplicationDateService $applicationDateService){}

    /**
     * Download an Excel file containing all application dates.
     *
     * @return \Symfony\Component\HttpFoundation\BinaryFileResponse
     */
    public function index(){
        return $this->applicationDateService->excel()->toBrowser();
    }
}
