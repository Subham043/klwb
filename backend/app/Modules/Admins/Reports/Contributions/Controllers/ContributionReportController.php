<?php

namespace App\Modules\Admins\Reports\Contributions\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Admins\Reports\Contributions\Services\ContributionService;
use App\Modules\Admins\Reports\Contributions\Services\NonContributionService;

class ContributionReportController extends Controller
{
    public function __construct(private ContributionService $contributionService, private NonContributionService $nonContributionService){}

    public function index(){
        $totalContribution = $this->contributionService->getCount();
        $totalContributionAmount = $this->contributionService->getTotalAmount();
        $totalNonContribution = $this->nonContributionService->getCount();
        return response()->json(["message" => "Contribution Report fetched successfully.", "totalContribution" => $totalContribution, "totalContributionAmount" => $totalContributionAmount, "totalNonContribution" => $totalNonContribution], 200);
    }
}
