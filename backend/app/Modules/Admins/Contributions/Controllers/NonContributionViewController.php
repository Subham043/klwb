<?php

namespace App\Modules\Admins\Contributions\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Admins\Contributions\Resources\NonContributionCollection;
use App\Modules\Admins\Contributions\Services\NonContributionService;

class NonContributionViewController extends Controller
{
    public function __construct(private NonContributionService $contributionService){}

    /**
     * Show the specified non contribution.
     *
     * @param  int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function index($id){
        $contribution = $this->contributionService->getById($id);
        return response()->json(["message" => "Non-Contribution fetched successfully.", "data" => NonContributionCollection::make($contribution)], 200);
    }
}
