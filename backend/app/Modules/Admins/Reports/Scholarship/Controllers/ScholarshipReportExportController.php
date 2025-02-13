<?php

namespace App\Modules\Admins\Reports\Scholarship\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Admins\Reports\Scholarship\Exports\ScholarshipExport;
use App\Modules\Admins\Reports\Scholarship\Services\AdminScholarshipService;
use Maatwebsite\Excel\Facades\Excel;

class ScholarshipReportExportController extends Controller
{
    public function __construct(private AdminScholarshipService $scholarshipService){}

    /**
     * Downloads the report as Excel file
     *
     * @return \Symfony\Component\HttpFoundation\BinaryFileResponse
     */
    public function index(){
        ini_set('memory_limit', '-1');
        ini_set('max_execution_time', 300);
        return Excel::download(new ScholarshipExport($this->scholarshipService->getExcelQuery()), 'scholarship_report.xlsx');
    }
}
