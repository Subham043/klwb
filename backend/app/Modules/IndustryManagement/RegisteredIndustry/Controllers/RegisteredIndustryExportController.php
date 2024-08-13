<?php

namespace App\Modules\IndustryManagement\RegisteredIndustry\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\IndustryManagement\RegisteredIndustry\Services\RegisteredIndustryService;

class RegisteredIndustryExportController extends Controller
{
    private $industryService;

    public function __construct(RegisteredIndustryService $industryService)
    {
        $this->industryService = $industryService;
    }

    public function index(){
        return $this->industryService->excel()->toBrowser();
    }
}
