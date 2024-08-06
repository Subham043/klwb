<?php

namespace App\Modules\InstituteManagement\RegisteredInstitutes\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\InstituteManagement\RegisteredInstitutes\Exports\RegisteredInstituteExport;
use App\Modules\InstituteManagement\RegisteredInstitutes\Services\RegisteredInstituteService;
use Illuminate\Http\Request;
use Maatwebsite\Excel\Facades\Excel;

class RegisteredInstituteExportController extends Controller
{
    private $instituteService;

    public function __construct(RegisteredInstituteService $instituteService)
    {
        $this->instituteService = $instituteService;
    }

    public function index(Request $request){
        $institute = $this->instituteService->all($request->taluq_id ?? null);
        return Excel::download(new RegisteredInstituteExport($institute), 'institutes.xlsx');
    }
}
