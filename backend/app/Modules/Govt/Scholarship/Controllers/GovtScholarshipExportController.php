<?php

namespace App\Modules\Govt\Scholarship\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Govt\Scholarship\Services\GovtScholarshipService;

class GovtScholarshipExportController extends Controller
{
    public function __construct(private GovtScholarshipService $scholarshipService){}

    /**
     * Export scholarship data as an Excel file and send it to the browser for download.
     *
     * @return \Illuminate\Http\Response
     */

    public function index(){
        return $this->scholarshipService->excel()->toBrowser();
    }
}
