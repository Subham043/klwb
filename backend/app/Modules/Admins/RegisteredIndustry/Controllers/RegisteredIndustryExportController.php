<?php

namespace App\Modules\Admins\RegisteredIndustry\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Admins\RegisteredIndustry\Exports\RegisteredIndustryExport;
use App\Modules\Admins\RegisteredIndustry\Services\RegisteredIndustryService;
use Maatwebsite\Excel\Facades\Excel;

class RegisteredIndustryExportController extends Controller
{
    public function __construct(private RegisteredIndustryService $industryService){}

    /**
     * Download an Excel file containing all registered industries.
     *
     * @return \Symfony\Component\HttpFoundation\BinaryFileResponse
     */
    public function index(){
        ini_set('memory_limit', '-1');
        ini_set('max_execution_time', 300);
        return Excel::download(new RegisteredIndustryExport($this->industryService->getExcelQuery()), 'registered_industry.xlsx');
    }
}
