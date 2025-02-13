<?php

namespace App\Modules\Admins\ApplicationDates\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Admins\ApplicationDates\Exports\ApplicationDateExport;
use App\Modules\Admins\ApplicationDates\Services\ApplicationDateService;
use Maatwebsite\Excel\Facades\Excel;

class ApplicationDateExportController extends Controller
{
    public function __construct(private ApplicationDateService $applicationDateService){}

    /**
     * Download an Excel file containing all application dates.
     *
     * @return \Symfony\Component\HttpFoundation\BinaryFileResponse
     */
    public function index(){
        ini_set('memory_limit', '-1');
        ini_set('max_execution_time', 300);
        return Excel::download(new ApplicationDateExport($this->applicationDateService->getExcelQuery()), 'application_dates.xlsx');
    }
}
