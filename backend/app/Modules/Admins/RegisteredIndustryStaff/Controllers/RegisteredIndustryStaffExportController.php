<?php

namespace App\Modules\Admins\RegisteredIndustryStaff\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Admins\Employees\Exports\EmployeeExport;
use App\Modules\Admins\RegisteredIndustry\Services\RegisteredIndustryService;
use App\Modules\Admins\RegisteredIndustryStaff\Services\RegisteredIndustryStaffService;
use Maatwebsite\Excel\Facades\Excel;

class RegisteredIndustryStaffExportController extends Controller
{
    public function __construct(private RegisteredIndustryStaffService $staffService){}

    /**
     * Export registered industry staff data to a browser-compatible format.
     *
     * @param int $id The ID of the industry to retrieve and export staff data for.
     * @return \Illuminate\Http\Response The response containing the exported data.
     */

    public function index($id){
        ini_set('memory_limit', '-1');
        ini_set('max_execution_time', 300);
        $industry = (new RegisteredIndustryService)->getById($id);
        return Excel::download(new EmployeeExport($this->staffService->getExcelQuery($industry->reg_industry_id, $industry->id)), 'industry_staffs.xlsx');
    }
}
