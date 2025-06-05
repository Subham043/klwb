<?php

namespace App\Modules\Govt\Scholarship\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Enums\Guards;
use App\Modules\Admins\Scholarship\Exports\AdminScholarshipExport;
use App\Modules\Govt\Scholarship\Services\GovtScholarshipService;
use App\Modules\Roles\Enums\Roles;
use Maatwebsite\Excel\Facades\Excel;

class GovtScholarshipExportController extends Controller
{
    public function __construct(private GovtScholarshipService $scholarshipService){}

    /**
     * Export scholarship data as an Excel file and send it to the browser for download.
     *
     * @return \Illuminate\Http\Response
     */

    public function index(){
        ini_set('memory_limit', '-1');
        ini_set('max_execution_time', 300);
        return (auth()->guard(Guards::Admin->value())->user()->current_role == Roles::VerificationOfficer->value()) ? Excel::download(new AdminScholarshipExport($this->scholarshipService->getExcelQuery()), 'applications.xlsx') : abort(403);
        // return Excel::download(new AdminScholarshipExport($this->scholarshipService->getExcelQuery()), 'applications.xlsx');
    }
}
