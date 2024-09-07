<?php

namespace App\Modules\Admins\Fees\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Admins\Fees\Services\FeeService;

class FeeExportController extends Controller
{
    public function __construct(private FeeService $feeService){}

    public function index(){
        return $this->feeService->excel()->toBrowser();
    }
}
