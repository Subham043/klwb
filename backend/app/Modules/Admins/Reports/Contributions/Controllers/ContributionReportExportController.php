<?php

namespace App\Modules\Admins\Reports\Contributions\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Admins\Reports\Contributions\Services\ContributionService;

class ContributionReportExportController extends Controller
{
    public function __construct(private ContributionService $scholarshipService){}

    public function index(){
        return $this->scholarshipService->excel()->toBrowser();
    }
}
