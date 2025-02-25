<?php

namespace App\Modules\Admins\Contributions\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Admins\Contributions\Resources\NonContributionCollection;
use App\Modules\Admins\Contributions\Services\NonContributionService;
use Illuminate\Http\Request;

class NonContributionPaginateController extends Controller
{
    public function __construct(private NonContributionService $contributionService){}

    /**
     * Show the list of non-contributions.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request){
        $year = request()->query('filter')['year'] ?? null;
        if(empty($year)){
            return response()->json(['message' => 'Please select year'], 422);
        }
        $data = $this->contributionService->getList($request->total ?? 10);
        return NonContributionCollection::collection($data);
    }

}
