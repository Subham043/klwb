<?php

namespace App\Modules\Admins\Reports\Scholarship\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Admins\Reports\Scholarship\Services\AdminScholarshipService;

class ScholarshipReportExportController extends Controller
{
    public function __construct(private AdminScholarshipService $scholarshipService){}

    /**
     * Downloads the report as Excel file
     *
     * @return \Symfony\Component\HttpFoundation\BinaryFileResponse
     */
    public function index(){
        return $this->scholarshipService->excel()->toBrowser();
    }
}
