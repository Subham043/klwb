<?php

namespace App\Modules\PaymentOfficer\Contributions\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\PaymentOfficer\Contributions\Services\ContributionService;

class ContributionExportController extends Controller
{
    public function __construct(private ContributionService $contributionService){}

    public function index(){
        return ($this->contributionService->excel());
        return $this->contributionService->excel()->toBrowser();
    }
}
