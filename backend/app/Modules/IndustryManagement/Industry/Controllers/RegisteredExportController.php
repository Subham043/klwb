<?php

namespace App\Modules\IndustryManagement\Industry\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\IndustryManagement\Industry\Services\IndustryRegisteredService;

class RegisteredExportController extends Controller
{
    private $industryService;

    public function __construct(IndustryRegisteredService $industryService)
    {
        $this->industryService = $industryService;
    }

    public function index(){
        return $this->industryService->excel()->toBrowser();
    }
}
