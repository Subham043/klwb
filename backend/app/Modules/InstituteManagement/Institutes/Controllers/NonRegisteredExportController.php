<?php

namespace App\Modules\InstituteManagement\Institutes\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\InstituteManagement\Institutes\Services\InstituteNonRegisteredService;
use App\Modules\InstituteManagement\Institutes\Exports\NonRegisteredExport;
use Maatwebsite\Excel\Facades\Excel;

class NonRegisteredExportController extends Controller
{
    private $instituteService;

    public function __construct(InstituteNonRegisteredService $instituteService)
    {
        $this->instituteService = $instituteService;
    }

    public function index(){
        $institute = $this->instituteService->all();
        return Excel::download(new NonRegisteredExport($institute), 'non_registered_institutes.xlsx');
    }
}
