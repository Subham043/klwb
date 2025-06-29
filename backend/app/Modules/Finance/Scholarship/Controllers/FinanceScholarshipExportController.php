<?php

namespace App\Modules\Finance\Scholarship\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Enums\Guards;
use App\Modules\Finance\Scholarship\Exports\FinanceScholarshipExport;
use App\Modules\Finance\Scholarship\Services\FinanceScholarshipService;
use App\Modules\Roles\Enums\Roles;
use Maatwebsite\Excel\Facades\Excel;

class FinanceScholarshipExportController extends Controller
{
    public function __construct(private FinanceScholarshipService $scholarshipService){}

    /**
     * Download a list of all applications in XLSX format.
     *
     * @return \Symfony\Component\HttpFoundation\BinaryFileResponse
     */
    public function index(){
        ini_set('memory_limit', '-1');
        ini_set('max_execution_time', 300);
        return (auth()->guard(Guards::Admin->value())->user()->current_role == Roles::FinancialOfficer->value()) ? Excel::download(new FinanceScholarshipExport($this->scholarshipService->getExcelQuery()), 'applications.xlsx') : abort(403);
        // return Excel::download(new FinanceScholarshipExport($this->scholarshipService->getExcelQuery()), 'applications.xlsx');
    }
}
