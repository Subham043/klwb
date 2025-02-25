<?php

namespace App\Modules\Admins\Reports\Contributions\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Admins\Reports\Contributions\Resources\ContributionComparisonReportCollection;
use App\Modules\Admins\Reports\Contributions\Services\ContributionComparisonService;

class ContributionComparisonReportListController extends Controller
{
    public function __construct(private ContributionComparisonService $contributionService){}

    /**
     * List all contributions.
     *
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    public function index(){
        $year = request()->query('filter')['year'] ?? null;
        if(empty($year)){
            return response()->json(['message' => 'Please select year'], 422);
        }
        $contribution = $this->contributionService->getList(request()->query('total') ?? 10);
        return ContributionComparisonReportCollection::collection($contribution);
    }
}
