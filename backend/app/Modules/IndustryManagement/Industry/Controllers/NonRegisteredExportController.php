<?php

namespace App\Modules\IndustryManagement\Industry\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\IndustryManagement\Industry\Services\IndustryNonRegisteredService;

class NonRegisteredExportController extends Controller
{
    public function __construct(private IndustryNonRegisteredService $industryService){}

    public function index(){
        return $this->industryService->excel()->toBrowser();
    }
}
