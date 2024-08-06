<?php

namespace App\Modules\ApplicationManagement\ApplicationDates\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\ApplicationManagement\ApplicationDates\Exports\ApplicationDateExport;
use App\Modules\ApplicationManagement\ApplicationDates\Services\ApplicationDateService;
use Maatwebsite\Excel\Facades\Excel;

class ApplicationDateExportController extends Controller
{
    private $applicationDateService;

    public function __construct(ApplicationDateService $applicationDateService)
    {
        $this->applicationDateService = $applicationDateService;
    }

    public function index(){
        $data = $this->applicationDateService->all();
        return Excel::download(new ApplicationDateExport($data), 'application_dates.xlsx');
    }
}
