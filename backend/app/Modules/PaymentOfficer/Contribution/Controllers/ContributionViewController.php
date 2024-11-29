<?php

namespace App\Modules\PaymentOfficer\Contributions\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\PaymentOfficer\Contributions\Resources\ContributionCollection;
use App\Modules\PaymentOfficer\Contributions\Services\ContributionService;

class ContributionViewController extends Controller
{
    public function __construct(private ContributionService $contributionService){}

    public function index($id){
        $contribution = $this->contributionService->getById($id);
        return response()->json(["message" => "Contribution fetched successfully.", "data" => ContributionCollection::make($contribution)], 200);
    }
}
