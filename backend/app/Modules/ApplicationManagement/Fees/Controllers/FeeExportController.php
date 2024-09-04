<?php

namespace App\Modules\ApplicationManagement\Fees\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\ApplicationManagement\Fees\Services\FeeService;

class FeeExportController extends Controller
{
    public function __construct(private FeeService $feeService){}

    public function index(){
        return $this->feeService->excel()->toBrowser();
    }
}
