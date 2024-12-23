<?php

namespace App\Modules\PaymentOfficer\Contribution\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\PaymentOfficer\Contribution\Resources\NonContributionCollection;
use App\Modules\PaymentOfficer\Contribution\Services\NonContributionService;
use Illuminate\Http\Request;

class NonContributionPaginateController extends Controller
{
    public function __construct(private NonContributionService $contributionService){}

    /**
     * Display a paginated list of non-contributions.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */

    public function index(Request $request){
        $data = $this->contributionService->getList($request->total ?? 10);
        return NonContributionCollection::collection($data);
    }

}
