<?php

namespace App\Modules\Admins\Contributions\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Admins\Contributions\Resources\ContributionCollection;
use App\Modules\Admins\Contributions\Services\AttemptedContributionService;

class AttemptedContributionViewController extends Controller
{
    public function __construct(private AttemptedContributionService $contributionService){}

    /**
     * Display the specified contribution.
     *
     * @param int $id The ID of the contribution to fetch.
     * @return \Illuminate\Http\JsonResponse
     */

    public function index($id){
        $contribution = $this->contributionService->getById($id);
        return response()->json(["message" => "Contribution fetched successfully.", "data" => ContributionCollection::make($contribution)], 200);
    }
}
