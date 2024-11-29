<?php

namespace App\Modules\PaymentOfficer\Contribution\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\PaymentOfficer\Contribution\Services\NonContributionService;

class NonContributionExportController extends Controller
{
    public function __construct(private NonContributionService $contributionService){}

    public function index(){
        return $this->contributionService->excel()->toBrowser();
    }
}
