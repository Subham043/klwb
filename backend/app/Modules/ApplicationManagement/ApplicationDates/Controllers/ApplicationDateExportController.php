<?php

namespace App\Modules\ApplicationManagement\ApplicationDates\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\ApplicationManagement\ApplicationDates\Services\ApplicationDateService;

class ApplicationDateExportController extends Controller
{
    public function __construct(private ApplicationDateService $applicationDateService){}

    public function index(){
        return $this->applicationDateService->excel()->toBrowser();
    }
}
