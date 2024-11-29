<?php

namespace App\Modules\PaymentOfficer\Contributions\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\PaymentOfficer\Contributions\Resources\NonContributionCollection;
use App\Modules\PaymentOfficer\Contributions\Services\NonContributionService;
use Illuminate\Http\Request;

class NonContributionPaginateController extends Controller
{
    public function __construct(private NonContributionService $contributionService){}

    public function index(Request $request){
        $data = $this->contributionService->getList($request->total ?? 10);
        return NonContributionCollection::collection($data);
    }

}
