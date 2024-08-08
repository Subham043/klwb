<?php

namespace App\Modules\InstituteManagement\RegisteredInstitutes\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\InstituteManagement\RegisteredInstitutes\Exports\RegisteredInstituteExport;
use App\Modules\InstituteManagement\RegisteredInstitutes\Services\RegisteredInstituteService;
use Maatwebsite\Excel\Facades\Excel;

class RegisteredInstituteExportController extends Controller
{
    private $instituteService;

    public function __construct(RegisteredInstituteService $instituteService)
    {
        $this->instituteService = $instituteService;
    }

    public function index(){
        $institute = $this->instituteService->all();
        return Excel::download(new RegisteredInstituteExport($institute), 'institutes.xlsx');
    }
}
