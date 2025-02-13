<?php

namespace App\Modules\Admins\RequestIndustry\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Admins\RequestIndustry\Exports\RequestIndustryExport;
use App\Modules\Admins\RequestIndustry\Services\RequestIndustryService;
use Maatwebsite\Excel\Facades\Excel;

class RequestIndustryExportController extends Controller
{
    public function __construct(private RequestIndustryService $industryService){}

    /**
     * Downloads an Excel file containing all request industries.
     *
     * @return \Symfony\Component\HttpFoundation\BinaryFileResponse
     */
    public function index(){
        ini_set('memory_limit', '-1');
        ini_set('max_execution_time', 300);
        return Excel::download(new RequestIndustryExport($this->industryService->getExcelQuery()), 'request_industries.xlsx');
    }
}
