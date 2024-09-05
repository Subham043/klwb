<?php

namespace App\Modules\Admins\RequestIndustry\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Admins\RequestIndustry\Services\RequestIndustryService;

class RequestIndustryExportController extends Controller
{
    public function __construct(private RequestIndustryService $industryService){}

    public function index(){
        return $this->industryService->excel()->toBrowser();
    }
}
