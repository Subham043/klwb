<?php

namespace App\Modules\Admins\RegisteredInstituteActivityLog\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Enums\Guards;
use App\Modules\Admins\RegisteredIndustryActivityLog\Exports\RegisteredIndustryActivityLogExport;
use App\Modules\Admins\RegisteredInstituteActivityLog\Services\RegisteredInstituteActivityLogService;
use App\Modules\Roles\Enums\Roles;
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
        return (auth()->guard(Guards::Admin->value())->user()->current_role == Roles::SuperAdmin->value() || auth()->guard(Guards::Admin->value())->user()->current_role == Roles::Admin->value()) ? Excel::download(new RegisteredIndustryActivityLogExport($this->logService->getExcelQuery($reg_institute_id)), 'activity_logs.xlsx') : abort(403);
        // return Excel::download(new RegisteredIndustryActivityLogExport($this->logService->getExcelQuery($reg_institute_id)), 'activity_logs.xlsx');
    }

}
