<?php

namespace App\Modules\Admins\RequestInstitutes\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Admins\RequestInstitutes\Exports\RequestInstituteExport;
use App\Modules\Admins\RequestInstitutes\Services\RequestInstituteService;
use Maatwebsite\Excel\Facades\Excel;

class RequestInstituteExportController extends Controller
{
    public function __construct(private RequestInstituteService $instituteService){}

    /**
     * Export and download an Excel file containing all requested institutes.
     *
     * @return \Symfony\Component\HttpFoundation\BinaryFileResponse
     */

    public function index(){
        ini_set('memory_limit', '-1');
        ini_set('max_execution_time', 300);
        return Excel::download(new RequestInstituteExport($this->instituteService->getExcelQuery()), 'request_institutes.xlsx');
    }
}
