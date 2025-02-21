<?php

namespace App\Modules\Admins\RegisteredIndustryActivityLog\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Admins\RegisteredIndustryActivityLog\Exports\RegisteredIndustryActivityLogExport;
use App\Modules\Admins\RegisteredIndustryActivityLog\Services\RegisteredIndustryActivityLogService;
use Maatwebsite\Excel\Facades\Excel;

class RegisteredIndustryActivityLogExportController extends Controller
{
    public function __construct(private RegisteredIndustryActivityLogService $logService){}

    /**
     * Download an Excel file containing all registered industries.
     *
     * @return \Symfony\Component\HttpFoundation\BinaryFileResponse
     */
    public function index(string $reg_industry_id){
        ini_set('memory_limit', '-1');
        ini_set('max_execution_time', 300);
        return Excel::download(new RegisteredIndustryActivityLogExport($this->logService->getExcelQuery($reg_industry_id)), 'activity_logs.xlsx');
    }

}
