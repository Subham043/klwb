<?php

namespace App\Modules\Admins\Scholarship\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Admins\Scholarship\Exports\AdminScholarshipExport;
use App\Modules\Admins\Scholarship\Services\AdminScholarshipService;
use Maatwebsite\Excel\Facades\Excel;

class AdminScholarshipExportController extends Controller
{
    public function __construct(private AdminScholarshipService $scholarshipService){}

    /**
     * Download an Excel file containing all the admin applications
     *
     * @return \Illuminate\Http\Response
     */
    public function index(){
        ini_set('memory_limit', '-1');
        ini_set('max_execution_time', 300);
        return Excel::download(new AdminScholarshipExport($this->scholarshipService->getExcelQuery()), 'applications.xlsx');
    }
}
