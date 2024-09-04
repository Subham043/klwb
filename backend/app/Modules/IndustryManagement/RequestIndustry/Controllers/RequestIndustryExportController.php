<?php

namespace App\Modules\IndustryManagement\RequestIndustry\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\IndustryManagement\RequestIndustry\Services\RequestIndustryService;

class RequestIndustryExportController extends Controller
{
    public function __construct(private RequestIndustryService $industryService){}

    public function index(){
        return $this->industryService->excel()->toBrowser();
    }
}
