<?php

namespace App\Modules\Admins\RegisteredIndustry\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Admins\RegisteredIndustry\Services\RegisteredIndustryService;

class RegisteredIndustryExportController extends Controller
{
    public function __construct(private RegisteredIndustryService $industryService){}

    public function index(){
        return $this->industryService->excel()->toBrowser();
    }
}
