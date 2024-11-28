<?php

namespace App\Modules\Admins\Contributions\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Admins\Contributions\Services\NonContributionService;

class NonContributionExportController extends Controller
{
    public function __construct(private NonContributionService $contributionService){}

    public function index(){
        return $this->contributionService->excel()->toBrowser();
    }
}
