<?php

namespace App\Modules\Admins\StudentActivityLog\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Admins\RegisteredIndustryActivityLog\Exports\RegisteredIndustryActivityLogExport;
use App\Modules\Admins\StudentActivityLog\Services\StudentActivityLogService;
use Maatwebsite\Excel\Facades\Excel;

class StudentActivityLogExportController extends Controller
{
    public function __construct(private StudentActivityLogService $logService){}

    /**
     * Show the list of logs.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function index(string $user_id){
        ini_set('memory_limit', '-1');
        ini_set('max_execution_time', 300);
        return Excel::download(new RegisteredIndustryActivityLogExport($this->logService->getExcelQuery($user_id)), 'activity_logs.xlsx');
    }

}
