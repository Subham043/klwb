<?php

namespace App\Modules\Admins\ApplicationDates\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Admins\ApplicationDates\Services\ApplicationDateService;

class ApplicationDateExportController extends Controller
{
    public function __construct(private ApplicationDateService $applicationDateService){}

    public function index(){
        return $this->applicationDateService->excel()->toBrowser();
    }
}
