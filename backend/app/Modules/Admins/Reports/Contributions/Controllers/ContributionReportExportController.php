<?php

namespace App\Modules\Admins\Reports\Contributions\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Admins\Reports\Contributions\Exports\ContributionExport;
use App\Modules\Admins\Reports\Contributions\Services\ContributionService;
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
        return Excel::download(new ContributionExport($this->contributionService->getExcelQuery()), 'contributions_report.xlsx');
    }
}
