<?php

namespace App\Modules\Admins\Institutes\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Admins\Institutes\Exports\InstituteExport;
use App\Modules\Admins\Institutes\Services\InstituteService;
use Maatwebsite\Excel\Facades\Excel;

class InstituteExportController extends Controller
{
    public function __construct(private InstituteService $instituteService){}

    /**
     * Download an Excel file containing all institutes.
     *
     * @return \Symfony\Component\HttpFoundation\BinaryFileResponse
     */
    public function index(){
        ini_set('memory_limit', '-1');
        ini_set('max_execution_time', 300);
        return Excel::download(new InstituteExport($this->instituteService->getExcelQuery()), 'institutes.xlsx');
    }
}
