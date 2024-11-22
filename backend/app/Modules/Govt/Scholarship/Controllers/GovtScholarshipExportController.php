<?php

namespace App\Modules\Govt\Scholarship\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Govt\Scholarship\Services\GovtScholarshipService;

class GovtScholarshipExportController extends Controller
{
    public function __construct(private GovtScholarshipService $scholarshipService){}

    public function index(){
        return $this->scholarshipService->excel()->toBrowser();
    }
}
