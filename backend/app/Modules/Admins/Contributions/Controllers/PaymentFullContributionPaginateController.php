<?php

namespace App\Modules\Admins\Contributions\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Admins\Contributions\Resources\PaymentFullContributionCollection;
use App\Modules\Admins\Contributions\Services\PaymentFullContributionService;
use Illuminate\Http\Request;

class PaymentFullContributionPaginateController extends Controller
{
    public function __construct(private PaymentFullContributionService $contributionService){}

    /**
     * Show the list of contributions.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request){
        $data = $this->contributionService->getList($request->total ?? 10);
        return PaymentFullContributionCollection::collection($data);
    }

}
