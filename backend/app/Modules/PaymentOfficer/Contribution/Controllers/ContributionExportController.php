<?php

namespace App\Modules\PaymentOfficer\Contribution\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\PaymentOfficer\Contribution\Services\ContributionService;

class ContributionExportController extends Controller
{
    public function __construct(private ContributionService $contributionService){}

    public function index(){
        return ($this->contributionService->excel());
        return $this->contributionService->excel()->toBrowser();
    }
}
