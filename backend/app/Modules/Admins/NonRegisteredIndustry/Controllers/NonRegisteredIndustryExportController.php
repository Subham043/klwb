<?php

namespace App\Modules\Admins\NonRegisteredIndustry\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Admins\NonRegisteredIndustry\Services\NonRegisteredIndustryService;

class NonRegisteredIndustryExportController extends Controller
{
    public function __construct(private NonRegisteredIndustryService $industryService){}

    public function index(){
        return $this->industryService->excel()->toBrowser();
    }
}
