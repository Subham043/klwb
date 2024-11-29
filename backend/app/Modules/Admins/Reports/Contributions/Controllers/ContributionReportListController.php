<?php

namespace App\Modules\Admins\Reports\Contributions\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Admins\Reports\Contributions\Resources\ContributionReportCollection;
use App\Modules\Admins\Reports\Contributions\Services\ContributionService;

class ContributionReportListController extends Controller
{
    public function __construct(private ContributionService $contributionService){}

    public function index(){
        $contribution = $this->contributionService->getList();
        return ContributionReportCollection::collection($contribution);
    }
}
