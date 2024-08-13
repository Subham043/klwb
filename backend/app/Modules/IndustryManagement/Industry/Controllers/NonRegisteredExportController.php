<?php

namespace App\Modules\IndustryManagement\Industry\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\IndustryManagement\Industry\Services\IndustryNonRegisteredService;

class NonRegisteredExportController extends Controller
{
    private $industryService;

    public function __construct(IndustryNonRegisteredService $industryService)
    {
        $this->industryService = $industryService;
    }

    public function index(){
        return $this->industryService->excel()->toBrowser();
    }
}
