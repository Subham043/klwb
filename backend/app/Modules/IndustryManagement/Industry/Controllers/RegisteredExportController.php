<?php

namespace App\Modules\IndustryManagement\Industry\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\IndustryManagement\Industry\Services\IndustryRegisteredService;

class RegisteredExportController extends Controller
{
    public function __construct(private IndustryRegisteredService $industryService){}

    public function index(){
        return $this->industryService->excel()->toBrowser();
    }
}
