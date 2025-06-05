<?php

namespace App\Modules\Admins\Reports\Contributions\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Enums\Guards;
use App\Modules\Admins\Reports\Contributions\Exports\ContributionExport;
use App\Modules\Admins\Reports\Contributions\Services\ContributionService;
use App\Modules\Roles\Enums\Roles;
use Maatwebsite\Excel\Facades\Excel;

class ContributionReportExportController extends Controller
{
    public function __construct(private ContributionService $contributionService){}

    /**
     * Download an Excel file containing all contributions.
     *
     * @return \Symfony\Component\HttpFoundation\BinaryFileResponse
     */
    public function index(){
        ini_set('memory_limit', '-1');
        ini_set('max_execution_time', 300);
        return (auth()->guard(Guards::Admin->value())->user()->current_role == Roles::SuperAdmin->value() || auth()->guard(Guards::Admin->value())->user()->current_role == Roles::Admin->value()) ? Excel::download(new ContributionExport($this->contributionService->getExcelQuery()), 'contributions_report.xlsx') : abort(403);
        // return Excel::download(new ContributionExport($this->contributionService->getExcelQuery()), 'contributions_report.xlsx');
    }
}
