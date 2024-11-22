<?php

namespace App\Modules\Finance\Scholarship\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Finance\Scholarship\Services\FinanceScholarshipService;

class FinanceScholarshipExportController extends Controller
{
    public function __construct(private FinanceScholarshipService $scholarshipService){}

    public function index(){
        return $this->scholarshipService->excel()->toBrowser();
    }
}
