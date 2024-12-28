<?php

namespace App\Modules\Admins\RegisteredIndustryContribution\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Admins\RegisteredIndustryContribution\Resources\RegisteredIndustryContributionCollection;
use App\Modules\Admins\RegisteredIndustryContribution\Services\RegisteredIndustryContributionService;
use Illuminate\Http\Request;

class RegisteredIndustryContributionPaginateController extends Controller
{
    public function __construct(private RegisteredIndustryContributionService $contributionService){}

    /**
     * Show the list of contributions.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request, string $reg_industry_id){
        $data = $this->contributionService->getList($request->total ?? 10, $reg_industry_id);
        return RegisteredIndustryContributionCollection::collection($data);
    }

}
