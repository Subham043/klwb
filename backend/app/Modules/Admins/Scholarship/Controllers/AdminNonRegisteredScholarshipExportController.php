<?php

namespace App\Modules\Admins\Scholarship\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Enums\Guards;
use App\Modules\Admins\Scholarship\Exports\AdminScholarshipExport;
use App\Modules\Admins\Scholarship\Services\AdminNonRegisteredScholarshipService;
use App\Modules\Roles\Enums\Roles;
use Maatwebsite\Excel\Facades\Excel;

class AdminNonRegisteredScholarshipExportController extends Controller
{
    public function __construct(private AdminNonRegisteredScholarshipService $scholarshipService){}

    /**
     * Download an Excel file containing all the admin applications
     *
     * @return \Illuminate\Http\Response
     */
    public function index(){
        ini_set('memory_limit', '-1');
        ini_set('max_execution_time', 300);
        return (auth()->guard(Guards::Admin->value())->user()->current_role == Roles::SuperAdmin->value() || auth()->guard(Guards::Admin->value())->user()->current_role == Roles::Admin->value()) ? Excel::download(new AdminScholarshipExport($this->scholarshipService->getExcelQuery()), 'applications.xlsx') : abort(403);
        // return Excel::download(new AdminScholarshipExport($this->scholarshipService->getExcelQuery()), 'applications.xlsx');
    }
}
