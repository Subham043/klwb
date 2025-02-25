<?php

namespace App\Modules\Admins\Reports\Contributions\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Admins\Reports\Contributions\Exports\ContributionComparisonExport;
use App\Modules\Admins\Reports\Contributions\Services\ContributionComparisonService;
use Maatwebsite\Excel\Facades\Excel;

class ContributionComparisonReportExportController extends Controller
{
    public function __construct(private ContributionComparisonService $contributionService){}

    /**
     * Download an Excel file containing all contributions.
     *
     * @return \Symfony\Component\HttpFoundation\BinaryFileResponse
     */
    public function index(){
        $year = request()->query('filter')['year'] ?? null;
        if(empty($year)){
            return response()->json(['message' => 'Please select year'], 422);
        }
        ini_set('memory_limit', '-1');
        ini_set('max_execution_time', 300);
        return Excel::download(new ContributionComparisonExport($this->contributionService->getExcelQuery()), 'contributions_comparison_report.xlsx');
    }
}
