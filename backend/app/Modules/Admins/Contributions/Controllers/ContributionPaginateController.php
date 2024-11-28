<?php

namespace App\Modules\Admins\Contributions\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Admins\Contributions\Resources\ContributionCollection;
use App\Modules\Admins\Contributions\Services\ContributionService;
use Illuminate\Http\Request;

class ContributionPaginateController extends Controller
{
    public function __construct(private ContributionService $contributionService){}

    public function index(Request $request){
        $data = $this->contributionService->getList($request->total ?? 10);
        return ContributionCollection::collection($data);
    }

}
