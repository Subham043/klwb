<?php

namespace App\Modules\Admins\Contributions\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Admins\Contributions\Services\ContributionActivityLogService;
use App\Modules\Admins\RegisteredIndustryActivityLog\Exports\RegisteredIndustryActivityLogExport;
use Maatwebsite\Excel\Facades\Excel;

class ContributionActivityLogExportController extends Controller
{
    public function __construct(private ContributionActivityLogService $logService){}

    /**
     * Download an Excel file containing all registered industries.
     *
     * @return \Symfony\Component\HttpFoundation\BinaryFileResponse
     */
    public function index(string $reg_institute_id){
        ini_set('memory_limit', '-1');
        ini_set('max_execution_time', 300);
        return Excel::download(new RegisteredIndustryActivityLogExport($this->logService->getExcelQuery($reg_institute_id)), 'activity_logs.xlsx');
    }

}
