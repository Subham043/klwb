<?php

namespace App\Modules\PaymentOfficer\Contribution\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\PaymentOfficer\Contribution\Resources\ContributionCollection;
use App\Modules\PaymentOfficer\Contribution\Services\ContributionService;
use Illuminate\Http\Request;

class ContributionPaginateController extends Controller
{
    public function __construct(private ContributionService $contributionService){}

    /**
     * List all contributions.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    public function index(Request $request){
        $data = $this->contributionService->getList($request->total ?? 10);
        return ContributionCollection::collection($data);
    }

}
