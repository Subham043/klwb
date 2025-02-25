<?php

namespace App\Modules\Admins\Contributions\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Admins\Contributions\Resources\ContributionCollection;
use App\Modules\Admins\Contributions\Services\NonContributionPaymentService;
use Illuminate\Http\Request;

class NonContributionPaymentPaginateController extends Controller
{
    public function __construct(private NonContributionPaymentService $contributionService){}

    /**
     * Show the list of contributions.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request, $comp_regd_id){
        $year = request()->query('filter')['year'] ?? null;
        if(empty($year)){
            return response()->json(['message' => 'Please select year'], 422);
        }
        $data = $this->contributionService->getList($comp_regd_id, $request->total ?? 10);
        return ContributionCollection::collection($data);
    }

}
