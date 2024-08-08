<?php

namespace App\Modules\InstituteManagement\RequestInstitutes\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\InstituteManagement\RequestInstitutes\Exports\RequestInstituteExport;
use App\Modules\InstituteManagement\RequestInstitutes\Services\RequestInstituteService;
use Maatwebsite\Excel\Facades\Excel;

class RequestInstituteExportController extends Controller
{
    private $instituteService;

    public function __construct(RequestInstituteService $instituteService)
    {
        $this->instituteService = $instituteService;
    }

    public function index(){
        $institute = $this->instituteService->all();
        return Excel::download(new RequestInstituteExport($institute), 'institutes.xlsx');
    }
}
