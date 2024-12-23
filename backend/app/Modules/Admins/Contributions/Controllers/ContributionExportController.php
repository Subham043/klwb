<?php

namespace App\Modules\Admins\Contributions\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Admins\Contributions\Services\ContributionService;

class ContributionExportController extends Controller
{
    public function __construct(private ContributionService $contributionService){}

    /**
     * Download an Excel file containing all contributions.
     *
     * @return \Symfony\Component\HttpFoundation\BinaryFileResponse
     */
    public function index(){
        return $this->contributionService->excel()->toBrowser();
    }
}
