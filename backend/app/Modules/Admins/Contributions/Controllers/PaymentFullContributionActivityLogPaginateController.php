<?php

namespace App\Modules\Admins\Contributions\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Admins\Contributions\Resources\PaymentFullContributionActivityLogCollection;
use App\Modules\Admins\Contributions\Services\PaymentFullContributionActivityLogService;
use Illuminate\Http\Request;

class PaymentFullContributionActivityLogPaginateController extends Controller
{
    public function __construct(private PaymentFullContributionActivityLogService $logService){}

    /**
     * Show the list of logs.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request){
        $data = $this->logService->getList($request->total ?? 10);
        return PaymentFullContributionActivityLogCollection::collection($data);
    }

}
