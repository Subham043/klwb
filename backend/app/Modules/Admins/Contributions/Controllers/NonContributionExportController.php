<?php

namespace App\Modules\Admins\Contributions\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Enums\Guards;
use App\Modules\Admins\Contributions\Services\NonContributionService;
use App\Modules\Admins\Industries\Exports\IndustryExport;
use App\Modules\Roles\Enums\Roles;
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
        return (auth()->guard(Guards::Admin->value())->user()->current_role == Roles::SuperAdmin->value() || auth()->guard(Guards::Admin->value())->user()->current_role == Roles::Admin->value()) ? Excel::download(new IndustryExport($this->contributionService->getExcelQuery()), 'non-contributions.xlsx') : abort(403);
        // return Excel::download(new IndustryExport($this->contributionService->getExcelQuery()), 'non-contributions.xlsx');
    }
}
