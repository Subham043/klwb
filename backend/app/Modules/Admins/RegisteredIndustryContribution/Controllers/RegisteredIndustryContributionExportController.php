<?php

namespace App\Modules\Admins\RegisteredIndustryContribution\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Enums\Guards;
use App\Modules\Admins\Contributions\Exports\ContributionsExport;
use App\Modules\Admins\RegisteredIndustryContribution\Services\RegisteredIndustryContributionService;
use App\Modules\Roles\Enums\Roles;
use Maatwebsite\Excel\Facades\Excel;

class RegisteredIndustryContributionExportController extends Controller
{
    public function __construct(private RegisteredIndustryContributionService $contributionService){}

    /**
     * Download an Excel file containing all contributions.
     *
     * @return \Symfony\Component\HttpFoundation\BinaryFileResponse
     */
    public function index(string $reg_industry_id){
        ini_set('memory_limit', '-1');
        ini_set('max_execution_time', 300);
        return (auth()->guard(Guards::Admin->value())->user()->current_role == Roles::SuperAdmin->value() || auth()->guard(Guards::Admin->value())->user()->current_role == Roles::Admin->value()) ? Excel::download(new ContributionsExport($this->contributionService->getExcelQuery($reg_industry_id)), 'registered_industry_contributions.xlsx') : abort(403);
        // return Excel::download(new ContributionsExport($this->contributionService->getExcelQuery($reg_industry_id)), 'registered_industry_contributions.xlsx');
    }
}
