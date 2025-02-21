<?php

namespace App\Modules\Admins\RegisteredInstituteActivityLog\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Admins\RegisteredIndustryActivityLog\Exports\RegisteredIndustryActivityLogExport;
use App\Modules\Admins\RegisteredInstituteActivityLog\Services\RegisteredInstituteActivityLogService;
use Maatwebsite\Excel\Facades\Excel;

class RegisteredInstituteActivityLogExportController extends Controller
{
    public function __construct(private RegisteredInstituteActivityLogService $logService){}

    /**
     * Show the list of logs.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function index(string $reg_institute_id){
        ini_set('memory_limit', '-1');
        ini_set('max_execution_time', 300);
        return Excel::download(new RegisteredIndustryActivityLogExport($this->logService->getExcelQuery($reg_institute_id)), 'activity_logs.xlsx');
    }

}
