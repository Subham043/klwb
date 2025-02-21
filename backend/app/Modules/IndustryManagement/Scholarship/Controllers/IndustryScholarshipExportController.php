<?php

namespace App\Modules\IndustryManagement\Scholarship\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Admins\Scholarship\Exports\AdminScholarshipExport;
use App\Modules\IndustryManagement\Scholarship\Services\IndustryScholarshipService;
use Maatwebsite\Excel\Facades\Excel;

class IndustryScholarshipExportController extends Controller
{

    public function __construct(private IndustryScholarshipService $scholarshipService){}

    /**
     * Download an Excel file containing all the admin applications
     *
     * @return \Illuminate\Http\Response
     */
    public function index(){
        ini_set('memory_limit', '-1');
        ini_set('max_execution_time', 300);
        return Excel::download(new AdminScholarshipExport($this->scholarshipService->getExcelQuery(), 2), 'applications.xlsx');
    }
}
