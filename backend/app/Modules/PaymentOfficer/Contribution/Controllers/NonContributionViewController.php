<?php

namespace App\Modules\PaymentOfficer\Contributions\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\PaymentOfficer\Contributions\Resources\NonContributionCollection;
use App\Modules\PaymentOfficer\Contributions\Services\NonContributionService;

class NonContributionViewController extends Controller
{
    public function __construct(private NonContributionService $contributionService){}

    public function index($id){
        $contribution = $this->contributionService->getById($id);
        return response()->json(["message" => "Non-Contribution fetched successfully.", "data" => NonContributionCollection::make($contribution)], 200);
    }
}
