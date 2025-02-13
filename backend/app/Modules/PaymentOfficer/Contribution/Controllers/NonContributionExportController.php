<?php

namespace App\Modules\PaymentOfficer\Contribution\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Admins\Industries\Exports\IndustryExport;
use App\Modules\PaymentOfficer\Contribution\Services\NonContributionService;
use Maatwebsite\Excel\Facades\Excel;

class NonContributionExportController extends Controller
{
    public function __construct(private NonContributionService $contributionService){}

    /**
     * Download an Excel file containing all non-contributions.
     *
     * @return \Symfony\Component\HttpFoundation\BinaryFileResponse
     */
    public function index(){
        ini_set('memory_limit', '-1');
        ini_set('max_execution_time', 300);
        return Excel::download(new IndustryExport($this->contributionService->getExcelQuery()), 'non-contributions.xlsx');
    }
}
