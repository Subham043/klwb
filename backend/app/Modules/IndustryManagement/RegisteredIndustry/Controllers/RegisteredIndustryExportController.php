<?php

namespace App\Modules\IndustryManagement\RegisteredIndustry\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\IndustryManagement\RegisteredIndustry\Services\RegisteredIndustryService;

class RegisteredIndustryExportController extends Controller
{
    public function __construct(private RegisteredIndustryService $industryService){}

    public function index(){
        return $this->industryService->excel()->toBrowser();
    }
}
