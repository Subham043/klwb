<?php

namespace App\Modules\Admins\RegisteredInstitute\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Admins\RegisteredInstitute\Exports\RegisteredInstituteExport;
use App\Modules\Admins\RegisteredInstitute\Services\RegisteredInstituteService;
use Maatwebsite\Excel\Facades\Excel;

class RegisteredInstituteExportController extends Controller
{
    public function __construct(private RegisteredInstituteService $instituteService){}

    /**
     * Download an Excel file containing all registered institutes.
     *
     * @return \Symfony\Component\HttpFoundation\BinaryFileResponse
     */
    public function index(){
        ini_set('memory_limit', '-1');
        ini_set('max_execution_time', 300);
        return Excel::download(new RegisteredInstituteExport($this->instituteService->getExcelQuery()), 'registered_institutes.xlsx');
    }
}
