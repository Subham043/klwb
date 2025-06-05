<?php

namespace App\Modules\InstituteManagement\Scholarship\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Enums\Guards;
use App\Modules\Admins\Scholarship\Exports\AdminScholarshipExport;
use App\Modules\InstituteManagement\Scholarship\Services\InstituteScholarshipService;
use App\Modules\Roles\Enums\Roles;
use Maatwebsite\Excel\Facades\Excel;

class InstituteScholarshipExportController extends Controller
{

    public function __construct(private InstituteScholarshipService $scholarshipService){}

    /**
     * Download an Excel file containing all the admin applications
     *
     * @return \Illuminate\Http\Response
     */
    public function index(){
        ini_set('memory_limit', '-1');
        ini_set('max_execution_time', 300);
        return (auth()->guard(Guards::Institute->value())->user()->current_role == Roles::Institute->value() || auth()->guard(Guards::Institute->value())->user()->current_role == Roles::InstituteStaff->value()) ? Excel::download(new AdminScholarshipExport($this->scholarshipService->getExcelQuery(), 1), 'applications.xlsx') : abort(403);
        // return Excel::download(new AdminScholarshipExport($this->scholarshipService->getExcelQuery(), 1), 'applications.xlsx');
    }
}
