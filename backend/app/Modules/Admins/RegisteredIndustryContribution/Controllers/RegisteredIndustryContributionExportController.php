<?php

namespace App\Modules\Admins\RegisteredIndustryContribution\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Admins\RegisteredIndustryContribution\Services\RegisteredIndustryContributionService;

class RegisteredIndustryContributionExportController extends Controller
{
    public function __construct(private RegisteredIndustryContributionService $contributionService){}

    /**
     * Download an Excel file containing all contributions.
     *
     * @return \Symfony\Component\HttpFoundation\BinaryFileResponse
     */
    public function index(string $reg_industry_id){
        return $this->contributionService->excel($reg_industry_id)->toBrowser();
    }
}
